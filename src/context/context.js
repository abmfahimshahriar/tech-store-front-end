import React, { Component } from 'react';
import { linkData } from './linkData';
import { socialData } from './socialData';
import { servicesData } from './servicesData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        links: linkData,
        socialLinks: socialData,
        servicesData: servicesData,
        cart: [],
        cartItems: 0,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: true,
        search: "",
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        company: "all",
        shipping: false,
        token: null,
        email: '',
        password: '',
        userId: '',
        role: '',
        cusName: '',
        address: '',
        contact: '',

        addCompany: '',
        addDescription: '',
        addFeatured: false,
        addFreeShipping: false,
        addImage: null,
        addPrice: 0,
        addTitle: '',

        isEditing: false,

        storeOrders: []
    };

    componentDidMount() {
        //this.setProducts(items);
        this.getToken();
        this.signInComponentDidMount();
        this.getProducts();
    }

    //handle user signin

    getToken = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        this.setState({ token: token, userId: userId, role: role });
    }

    handleChangeSignIn = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    signInComponentDidMount = () => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.handleSignOut();
            return;
        }
        const userId = localStorage.getItem('userId');
        const remainingMilliseconds =
            new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({ token: token, userId: userId });
        this.setAutoLogout(remainingMilliseconds);
    };
    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.handleSignOut();
        }, milliseconds);
    };
    signinHandler = (event) => {
        event.preventDefault();
        //this.setState({ authLoading: true });
        fetch('http://localhost:8080/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.status === 422) {
                    console.log("validation failed");
                    console.log(res.json());
                }
                else if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                }
                else {
                    return res.json();
                }

            })
            .then(resData => {

                localStorage.setItem('token', resData.token);
                localStorage.setItem('userId', resData.userId);
                localStorage.setItem('role', resData.role);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                this.setAutoLogout(remainingMilliseconds);
                //window.location.replace("/");
                //window.location = "/";
                //this.props.history.replace('/');
                console.log(resData);
                this.setState({
                    token: resData.token,
                    userId: resData.userId,
                    role: resData.role
                });
                window.location.replace("/");
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isAuth: false,
                    authLoading: false,
                    error: err
                });
            });
    };

    handleSignOut = () => {
        this.setState({ token: null, sidebarOpen: !this.state.sidebarOpen, userId:null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    }

    //set products
    getProducts = () => {
        fetch('http://localhost:8080/products/getproducts', {
            method: 'GET'
        })
            .then(res => {
                if (res.status !== 200) {
                    console.log('can not load products');
                }
                else {
                    return res.json();
                }
            })
            .then(resData => {
                console.log(resData);
                const products = resData.products;
                this.setProducts(products);
            })
            .catch(err => console.log(err));
    }
    // setProducts = (products) => {
    //     let storeProducts = products.map(item => {
    //         const { id } = item.sys;
    //         const image = item.fields.image.fields.file.url;
    //         const product = { id, ...item.fields, image};
    //         return product;
    //     });
    //     let featuredProducts = storeProducts.filter(item => item.featured === true);

    //     let maxPrice = Math.max(...storeProducts.map(item => item.price));
    //     this.setState({
    //         storeProducts,
    //         featuredProducts,
    //         filteredProducts: storeProducts,
    //         cart: this.getStorageCart(),
    //         singleProduct: this.getStorageProduct(),
    //         loading: false,
    //         price: maxPrice,
    //         maxPrice: maxPrice
    //     },
    //     () => {
    //         this.addTotals();
    //     }
    //     );
    // };
    setProducts = (products) => {
        let storeProducts = products.map(item => {
            const id = item._id;
            const image = 'http://localhost:8080/' + item.image;
            const product = { id, ...item, image };
            return product;
        });
        //console.log(storeProducts);
        let featuredProducts = storeProducts.filter(item => item.featured === true);

        let maxPrice = Math.max(...storeProducts.map(item => item.price));
        this.setState({
            storeProducts,
            featuredProducts,
            filteredProducts: storeProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            maxPrice: maxPrice
        },
            () => {
                this.addTotals();
            }
        );
    };
    //get cart from local storage
    getStorageCart = () => {
        let cart;
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        else {
            cart = [];
        }
        return cart;
    }
    //get products from local storage
    getStorageProduct = () => {
        return localStorage.getItem('singleProduct') ? JSON.parse(localStorage.getItem('singleProduct')) : {};
    }
    // get totals
    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        });
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));

        return {
            cartItems,
            subTotal,
            total,
            tax
        }
    };
    //add totals
    addTotals = () => {
        const totals = this.getTotals();

        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTotal: totals.total,
            cartTax: totals.tax
        })
    }
    //sync storage
    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }
    // add to cart
    addToCart = (id) => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if (!tempItem) {
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;
            let cartItems = { ...tempItem, count: 1, total };
            tempCart = [...tempCart, cartItems];
        }
        else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }

        this.setState(
            () => {
                return { cart: tempCart }
            },
            () => {
                this.addTotals();
                this.syncStorage();
                this.openCart();
            }
        );
    };
    // set single product
    setSingleProduct = (id) => {
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem('singleProduct', JSON.stringify(product));
        this.setState({
            singleProduct: { ...product },
            loading: false
        })
    };

    handleSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    };
    handleCart = () => {
        this.setState({ cartOpen: !this.state.cartOpen });
    };

    closeCart = () => {
        this.setState({ cartOpen: false });
    };

    openCart = () => {
        this.setState({ cartOpen: true });
    };

    //cart functionalities
    //increment item
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));

        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => {
            this.addTotals();
            this.syncStorage();
        })
    }
    //decrement item
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count--;
        if (cartItem.count === 0) {
            this.removeItem(id);
        }
        else {
            cartItem.total = cartItem.count * cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals();
                this.syncStorage();
            })
        }

    }
    //remove item
    removeItem = (id) => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState({
            cart: tempCart
        }, () => {
            this.addTotals();
            this.syncStorage();
        });
    }
    //clear the cart
    clearCart = () => {
        this.setState({
            cart: []
        }, () => {
            this.addTotals();
            this.syncStorage();
        });
    }
    //filtering methods
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        },
            this.sortData
        )
    }
    sortData = () => {
        const { storeProducts, price, company, shipping, search } = this.state;
        let tempPrice = parseInt(price);
        let tempProducts = [...storeProducts];
        // price filtering
        tempProducts = tempProducts.filter(item => item.price <= tempPrice);
        // company filtering
        if (company !== "all") {
            tempProducts = tempProducts.filter(item => item.company === company);
        }
        // free shipping filtering
        if (shipping) {
            tempProducts = tempProducts.filter(item => item.freeShipping === true);
        }
        // search filtering
        if (search.length > 0) {
            tempProducts = tempProducts.filter(item => {
                let tempSearch = search.toLocaleLowerCase();
                let tempTitle = item.title.toLocaleLowerCase().slice(0, search.length);
                if (tempSearch === tempTitle) {
                    return item;
                }
            });
        }
        this.setState({
            filteredProducts: tempProducts
        });
    };

    
    //add product
    handleChangeAddProduct = (event) => {
        const name = event.target.name;
        const files = event.target.files;
        let value = null;
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        else if (event.target.type === 'file') {
            value = files[0];
        }
        else {
            value = event.target.value;
        }
        this.setState({
            [name]: value
        });
    };

    addProductHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.addTitle);
        formData.append('company', this.state.addCompany);
        formData.append('description', this.state.addDescription);
        formData.append('featured', this.state.addFeatured);
        formData.append('freeShipping', this.state.addFreeShipping);
        formData.append('price', this.state.addPrice);
        formData.append('image', this.state.addImage);
        let url = 'http://localhost:8080/products/addproduct';
        let method = 'POST';
        if(this.state.isEditing) {
            url = 'http://localhost:8080/products/addproduct/' + this.state.singleProduct.id;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            body: formData,
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    return res.json();
                }
                else if (res.status === 201) {
                    window.location.replace("/products");
                }
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    };
    // delete product
    deleteProductHandler = (id) => {
        //console.log('product deleted');
        fetch('http://localhost:8080/products/deleteproduct/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('product delete failed');
                    return res.json();
                }
                else if (res.status === 200) {
                    window.location.replace("/");
                }
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // edit product
    editProductHandler = (id) => {
        console.log('product edit section');
        const singleProduct = JSON.parse(localStorage.getItem('singleProduct'));
        this.setState({
            addTitle : singleProduct.title,
            addPrice : singleProduct.price,
            //addImage : singleProduct.image,
            addFreeShipping : singleProduct.freeShipping,
            addFeatured : singleProduct.featured,
            addDescription : singleProduct.description,
            addCompany : singleProduct.company,
            isEditing : true
        });
    }

    // view and handle orders sections

    // order section
    handleChangeOrder = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    orderHandler = (event) => {
        event.preventDefault();

        let url = 'http://localhost:8080/products/addorder';
        let method = 'PUT';

        fetch(url, {
            method: method,
            body: JSON.stringify({
                cusName: this.state.cusName,
                address: this.state.address,
                contact: this.state.contact,
                userId: this.state.userId,
                total: this.state.cartTotal,
                products: [...this.state.cart]
            }),
            headers: {
                Authorization: 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    return res.json();
                }
                else if (res.status === 201) {
                    this.clearCart();
                    alert('Order placed succesfully')
                    window.location.replace("/");
                    return res.json();
                }

            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    };


    // get orders
    getOrders = () => {
        console.log('getting orders');
        this.handleSidebar();
        fetch('http://localhost:8080/products/getorders', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    console.log('can not load orders');
                }
                else {
                    return res.json();
                }
            })
            .then(resData => {
                console.log(resData);
                const orders = resData.orders;
                this.setOrders(orders);
            })
            .catch(err => console.log(err));
    };

    // set orders
    setOrders = (orders) => {
        let storeOrders = orders.map(item => {
            const id = item._id;
            const cusName = item.cusName;
            const address = item.address;
            const contact = item.contact;
            const creator = item.creator;
            const products = item.products;
            const status = item.status;
            const total = item.total;
            
            const order = { id, cusName, address, contact, creator, status, total, products };
            return order;
        });
        this.setState({storeOrders});
    };

    //delete orders

    deleteOrder = (id) => {
        fetch('http://localhost:8080/products/deleteorder/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('order delete failed');
                    return res.json();
                }
                else if (res.status === 200) {
                    window.location.replace("/");
                }
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // update order status

    updateOrderStatus = (id) => {
        fetch('http://localhost:8080/products/updateorderstatus/' + id, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('order update status failed');
                    return res.json();
                }
                else if (res.status === 201) {
                    this.getOrders();
                    this.handleSidebar();
                }
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                handleChange: this.handleChange,
                handleSignOut: this.handleSignOut,
                handleChangeSignIn: this.handleChangeSignIn,
                signinHandler: this.signinHandler,
                handleChangeOrder: this.handleChangeOrder,
                orderHandler: this.orderHandler,
                deleteProductHandler: this.deleteProductHandler,
                handleChangeAddProduct: this.handleChangeAddProduct,
                addProductHandler: this.addProductHandler,
                editProductHandler: this.editProductHandler,
                getOrders: this.getOrders,
                deleteOrder: this.deleteOrder,
                updateOrderStatus: this.updateOrderStatus
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };