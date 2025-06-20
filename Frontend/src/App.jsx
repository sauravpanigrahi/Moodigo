import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
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
import Settings from './pages/Settings'

import './App.css'

import Listing from './pages/NewProduct'
import Logout from './pages/Logout'
import CartDetails from './pages/CartDetails'
import Address from './pages/Address'
import MyAccount from './pages/myaccount'
import ProfileSection from './pages/profile'
import Contact from './components/contact'
import AboutUs from './pages/about'
function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
      setCartCount(Object.keys(storedCart).length);
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.setItem("cart", JSON.stringify({}));
      setCartCount(0);
    }
  }, []);

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  return (
    <DarkModeProvider>
      <AuthProvider>
        <ToastContainer />
        <Navbar cartCount={cartCount}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product  />} />
          <Route path="/products/:category/:subcategory" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetails setCartCount={updateCartCount} />} />
          <Route path="/products/:id/edit" element={<Edit />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/addproduct" element={<Listing /> } />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cartdetails" element={<CartDetails setCartCount={updateCartCount} />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/settings" element={<Settings />} />
        
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App
