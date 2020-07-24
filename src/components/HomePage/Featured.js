import React from 'react';
import Product from '../Product';
import Title from '../Title';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../../context';

const Featured = () => {
    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured products" center="true" />
                <div className="row my-5">
                    <ProductConsumer>
                        {value => {
                            const { featuredProducts } = value;

                            return featuredProducts.map(item => (
                                <Product key={item.id} product={item} />
                            ));
                        }}
                    </ProductConsumer>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to="/products" className="main-link">
                            our products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Featured;
