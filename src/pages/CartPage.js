import React from 'react';
import CartSection from '../components/CartPage';
import Hero from '../components/Hero';
import cartBcg from '../images/storeBcg.jpeg';

const CartPage = () => {
    return (
        <>
            <Hero img={cartBcg}/>
            <CartSection/>
        </>
    )
}

export default CartPage;