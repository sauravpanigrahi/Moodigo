import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

// Lucide React Icons
import { 
  ShoppingBag, 
  Shirt, 
  Crown, 
} from 'lucide-react';
const DisplayContent = () => {
  const { darkMode } = useDarkMode();
  const navigate=useNavigate();

const handleButton = () => {
    navigate('/products')
}


  return ( 
    <section className="py-4 py-md-5" style={{background: darkMode ? 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)' : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'}}>
    <div className="container py-3 py-md-5">
      <div className="row align-items-center">
        {/* Content Section - Full width on mobile, 6 columns on larger screens */}
        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <div className="text-white text-center text-lg-start">
            <h1 className="display-4 display-md-3 fw-bold mb-3 mb-md-4 animate__animated animate__fadeInUp" style={{fontSize: 'clamp(2rem, 6vw, 3.5rem)'}}>
              Fashion That Matches Your <span style={{background: 'linear-gradient(45deg, #ffd700, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Mood</span>
            </h1>
            <p className="lead mb-3 mb-md-4 opacity-90" style={{fontSize: 'clamp(1rem, 3vw, 1.25rem)'}}>
              Discover the latest trends in fashion and accessories. Shop from thousands of curated items that reflect your unique style and personality.
            </p>
            <div className="d-flex gap-2 gap-md-3 flex-wrap justify-content-center justify-content-lg-start">
             
              <button className="btn btn-outline-light btn-lg px-3 px-md-5 py-2 py-md-3 rounded-pill" onClick={handleButton} style={{fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'}}>
                <ShoppingBag className="w-4 h-4 w-md-5 h-md-5 me-2" />
                Start Shopping
              </button>
            </div>
          </div>
        </div>
        
        {/* Card Section - Full width on mobile, 6 columns on larger screens */}
        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <div className={`card ${darkMode ? 'bg-dark border-secondary' : 'bg-white'} shadow-lg rounded-4 p-3 p-md-4 animate__animated animate__fadeInRight`}>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary p-2 me-3">
                  <Shirt className="w-5 h-5 w-md-6 h-md-6 text-white" />
                </div>
                <div>
                  <h5 className="mb-0" style={{fontSize: 'clamp(1rem, 3vw, 1.25rem)'}}>Trending Now</h5>
                  <small className="text-muted">Hot picks this week</small>
                </div>
              </div>
              <div className="row g-2 g-md-3">
                <div className="col-6">
                  <div className="card border-0 bg-light rounded-3 p-2 p-md-3 text-center">
                    <div className="bg-primary rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)'}}>
                      <Shirt className="w-4 h-4 w-md-6 h-md-6 text-white" />
                    </div>
                    <small className="fw-bold" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>Summer Dresses</small>
                    <small className="text-muted d-block" style={{fontSize: 'clamp(0.625rem, 1.8vw, 0.75rem)'}}>From ₹1999</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-0 bg-light rounded-3 p-2 p-md-3 text-center">
                    <div className="bg-success rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)'}}>
                      <Crown className="w-4 h-4 w-md-6 h-md-6 text-white" />
                    </div>
                    <small className="fw-bold" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>Accessories</small>
                    <small className="text-muted d-block" style={{fontSize: 'clamp(0.625rem, 1.8vw, 0.75rem)'}}>From ₹1500</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
 
export default DisplayContent;
