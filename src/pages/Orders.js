import React from 'react';
import OrderedProduct from '../components/OrderedProduct';
import {ProductConsumer} from '../context';

const Orders = () => {
    return (
        <ProductConsumer>
        {
            value => {
                const {storeOrders} = value;
                return(
                    <div className="row py-5">
                                {
                                    storeOrders.length === 0 ? (
                                        <div className="col text-title text-center">
                                            Sorry, no orders found
                                        </div>
                                    ) : (
                                            storeOrders.map(item => {
                                                return <OrderedProduct key={item.id} order={item} />
                                            })
                                        )

                                }
                    </div>
                );
            }
        }
        </ProductConsumer>
    );
}

export default Orders;
