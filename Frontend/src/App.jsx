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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Listing from './pages/NewProduct'
import Logout from './pages/Logout'
import CartDetails from './pages/CartDetails'
import Address from './pages/Address'
import MyAccount from './pages/myaccount'
// import LearnMorePage from './pages/learnmore';
import ProfileSection from './pages/profile'
function App() {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || {};

  const [cartCount, setCartCount] = useState(Object.keys(storedCart).length);
  return (
    <>
    <ToastContainer />
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

      {/* <Route path="/learnmore" element={<LearnMorePage />} /> */}


    </Routes>
    </>
  )
}

export default App
