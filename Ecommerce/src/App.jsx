import React, { useEffect } from 'react';

import './index.css';
import Navbar from './Navbar'
import HomePage from './HomePage';
import Footer from './Footer';
import ProductPage from './ProductPage';
import RegisterPage from './RegisterPage';
import UserLogin from './UserLogin';
import Profile from './Profile';

import {Route, Switch} from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import ShoppingCart from './ShoppingCart';

export default function App() {
const {getMessage, clearMessage} = useFlashMessage();
const flashMessage = getMessage();

useEffect(()=> {
  const timer = setTimeout(() => {
    clearMessage();
  }, 4000);
},[flashMessage])
 
  return (
    <>
      <Navbar/>
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role='alert'>
          {flashMessage.message}
        </div>
      )}
      <Switch> 
        <Route path="/" component={HomePage}></Route>
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/cart" component={ShoppingCart}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/userLogin" component={UserLogin}></Route>
      </Switch>
       <Footer/>
		</>    
  );
}

