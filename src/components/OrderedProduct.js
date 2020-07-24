import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {FaTrash,FaUndo} from 'react-icons/fa';

const OrderedProduct = (props) => {
    return (
        <ProductConsumer>
            {value => {
                const {deleteOrder, updateOrderStatus} = value;
                
                return (
                    <OrderedProductWrapper className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3">
                        <div className="card">
                        <div className="image-container">
                            <p className="mb-0">Customer Name: {props.order.cusName}</p>
                            <p className="mb-0">Customer Address: {props.order.address}</p>
                            <p className="mb-0">Customer Contact: {props.order.contact}</p>
                            <p className="mb-0">Order Status: {props.order.status}</p>
                            <p className="mb-0">Order total: {props.order.total}</p>
                            <div className="product-icons">
                            <FaUndo 
                                className="icon"
                                onClick={() => updateOrderStatus(props.order.id)}
                            />
                            
                            <FaTrash 
                                className="icon"
                                onClick={() => deleteOrder(props.order.id)}
                            />
                            </div>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                        <ul>
                        {props.order.products.map(item => {
                            return (
                                <li key={item._id}>
                                <p>Product Name: {item.title}</p>
                                <p>Product quantity: {item.count}</p>
                                <p>Product total: {item.total}</p>
                                </li>
                            );
                        })}
                        </ul>
                        </div>
                        </div>
                    </OrderedProductWrapper>
                );
            }}
        </ProductConsumer>
    );
}

const OrderedProductWrapper = styled.div`
    .card{
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
        transition: var(--mainTransition);
        height: 100%;
    }
    .card:hover{
        box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.5);
        cursor: pointer;
    }
    .card-img-top {
        transition: var(--mainTransition);
    }
    .card:hover .card-img-top {
        transform: scale(1.15);
        opacity: 0.2;
    }
    .img-container{
        position: relative;
    }
    .product-icons {
        transition: var(--mainTransition);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        opacity: 0;
    }
    .icon {
        font-size: 2.5rem;
        padding: 0.5rem;
        margin: 1rem;
        color: var(--primaryColor);
        background: var(--mainBlack);
        border-radius: 0.5rem;
    }
    .card:hover .product-icons {
        opacity: 1;
    }
    .card-body {
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
`;

export default OrderedProduct;