import React from 'react';
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import {ProductConsumer} from '../context';
import singleProductImg from '../images/singleProductBcg.jpeg';

const SingleProductPage = () => {
    return (
        <>
            <Hero img={singleProductImg} title="single product"/>
            <ProductConsumer>
            {value => {
                const {singleProduct,addToCart,loading,deleteProductHandler,editProductHandler,role} = value;
                
                if(loading) {
                    console.log('hello from loading');
                    return <h1>product is loading...</h1>
                }
                const {
                    company,
                    description,
                    id,
                    price,
                    title,
                    image
                } = singleProduct;

                const deleteButton = <button type="button" 
                                            className="main-link" 
                                            style={{margin:"0.75rem"}} 
                                            onClick={() => deleteProductHandler(id)}>
                                            Delete Product
                                    </button>;
                const editButton = <Link to="/addproduct" 
                                    className="main-link"
                                    onClick={() => editProductHandler(id)}
                                    style={{margin:"0.75rem"}}>
                                    Edit product
                                    </Link>


                return (
                    <section className="py-5">
                    <div className="container">
                    <div className="row">
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                    <img src={image} alt="single product" className="img-fluid"/>
                    </div>
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                    <h5 className="text-title mb-4">model : {title}</h5>
                    <h5 className="text-capitalize text-muted mb-4">company : {company}</h5>
                    <h5 className="text-main text-capitalize mb-4">price : ${price}</h5>
                    <p className="text-capitalize text-title mt-3">
                    some info about the product :
                    </p>
                    <p>{description}</p>
                    <button type="button" 
                    className="main-link" 
                    style={{margin:"0.75rem"}} 
                    onClick={() => addToCart(id)}>
                    Add to cart
                    </button>
                    <Link to="/products" 
                    className="main-link"
                    style={{margin:"0.75rem"}}>
                    back to products
                    </Link>
                    {role === 'admin'? deleteButton : null}
                    {role === 'admin'? editButton : null}
                    
                    
                    </div>
                    </div>
                    </div>
                    </section>
                );
            }}
            </ProductConsumer>
        </>
    )
}

export default SingleProductPage;