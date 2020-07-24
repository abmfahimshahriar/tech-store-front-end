import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/AboutPage';
import Cart from './pages/CartPage';
import Contact from './pages/ContactPage';
import Default from './pages/Default';
import Home from './pages/HomePage';
import Products from './pages/ProductsPage';
import SingleProduct from './pages/SingleProductPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddProduct from './pages/AddProduct';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

import {Switch, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <SideCart/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/products' exact component={Products}/>
        <Route path='/products/:id' component={SingleProduct}/>
        <Route path='/auth/signup' component={SignUp}/>
        <Route path='/auth/signin' component={SignIn}/>
        <Route path='/addproduct' component={AddProduct}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={Orders}/>
        <Route  component={Default}/>
      </Switch>
      <Footer/>
    </>
  );
}



export default App;
