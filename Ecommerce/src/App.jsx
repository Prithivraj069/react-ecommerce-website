import React from 'react';
import './index.css';
import Navbar from './Navbar'
import HomePage from './HomePage';
import Footer from './Footer';
import ProductPage from './ProductPage';
import RegisterPage from './RegisterPage';
import {Route, Switch} from 'wouter';

export default function App() {

 
  return (
    <>
      <Navbar/>
      <Switch> 
        <Route path="/" component={HomePage}></Route>
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
      </Switch>
       <Footer/>
		</>    
  );
}

