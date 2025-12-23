import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import Home from './Home';
import Login from './shared/Login';
import Signup from './shared/Signup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './shared/ForgotPassowrd';
import Search from './products/Search';
import SingleProduct from './products/SingleProduct';
import Addresses from './address/Addresses';
import Cart from './products/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path='/login' Component={Login} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/reset-password' element={<ForgotPassword />} />
      <Route path='/product-search' element={<Search/>} />
      <Route path='/product/:productId' Component={SingleProduct} />
      <Route path='/address' Component={Addresses} />
      <Route path='/cart' Component={Cart} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
