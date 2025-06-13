import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import ProductDetails from './pages/Productdetails'
import Edit from './pages/Edit'
import SignInPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import Home from './pages/Home'
import './App.css'
import {  useState } from "react";
import Listing from './pages/NewProduct'
import Logout from './pages/Logout'
import CartDetails from './pages/CartDetails'
import Address from './pages/Address'
import MyAccount from './pages/myaccount'
import ProfileSection from './pages/profile'

function App() {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || {};

  const [cartCount, setCartCount] = useState(Object.keys(storedCart).length);

  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar cartCount={cartCount}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product  />} />
          <Route path="/products/:category/:subcategory" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetails setCartCount={setCartCount} />} />
          <Route path="/products/:id/edit" element={<Edit />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/addproduct" element={<Listing /> } />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cartdetails" element={<CartDetails />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/profile" element={<ProfileSection />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
