import React from 'react';
import {
    FaTrash, FaChevronCircleUp, FaChevronCircleDown
} from 'react-icons/fa';

const CartItem = (props) => {
    const {id,title,price,count,total,image} = props.cartItem;
    return (
        <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
        {/* image */}
        <div className="col-10 mx-auto col-lg-2 pb-2">
        <img src={image} className="img-fluid" width="60" alt="product"/>
        </div>
        {/* end of image */}

        {/* title */}
        <div className="col-10 mx-auto col-lg-2 pb-2">
        <span className="d-lg-none">Product : </span> {title}
        </div>
        {/* end of title */}

        {/* price */}
        <div className="col-10 mx-auto col-lg-2 pb-2">
        <span className="d-lg-none">Price : $</span> {price}
        </div>
        {/* end of price */}

        {/* count */}
        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
        <div>
        <FaChevronCircleDown
            className="cart-icon text-primary"
            onClick={() => props.decrement(id)}
        />
        <span className="text-title text-muted mx-3">{count}</span>
        <FaChevronCircleUp
            className="cart-icon text-primary"
            onClick={() => props.increment(id)}
        />
        </div>
        </div>
        </div>
        {/* end of count */}

        {/* remove item */}
        <div className="col-10 mx-auto col-lg-2">
        <FaTrash 
            className="text-danger cart-icon"
            onClick={() => props.removeItem(id)}
        />
        </div>
        {/* end of remove item */}

        {/* total */}
        <div className="col-10 mx-auto col-lg-2">
        <strong className="text-muted">Item Total : ${total}</strong>
        </div>
        {/* end of total */}

        </div>
    )
}

export default CartItem;