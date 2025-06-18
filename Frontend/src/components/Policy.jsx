import React, { useState } from 'react';
import {
  Shield,
  RefreshCw,
  Award,
  CreditCard,
  Heart,
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const policies = [
  {
    title: "Free Shipping",
    text: "Free shipping on all orders over $50. Fast delivery to your doorstep.",
    image: "https://imgs.search.brave.com/8vFOm4dUADVb-OO8qBggp_5YGyHT9oLr2Noyzq3TXNc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzcyLzU3LzU5/LzM2MF9GXzM3MjU3/NTkxMF9wV29HMzFI/RjB4MW0yRVp2bTU0/SU5KMEprQTR3WlVV/RS5qcGc"
  },
  {
    title: "Easy Returns",
    text: "30-day return policy. No questions asked, hassle-free returns.",
    image: "https://imgs.search.brave.com/-UaPR6GHeX_DQHa82oJL7voYuzGtQUj2P-HqRo-mmag/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY4L2Rj/LzEyLzY4ZGMxMmU3/ZGEyZDQ5OWM2ZjEx/ZDcwZWEyZTk2NDk5/LmpwZw"
  },
  {
    title: "Secure Payment",
    text: "Your payment information is always secure with encrypted transactions.",
    image: "https://imgs.search.brave.com/NSdZ3APHQ0H0ZfRASrdmu1ieb_IkMxnYotZNnFGd_tw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/ZGVzaWduZmlsZS5j/b20vdXBsb2FkLzIw/MTgvMDEvU2VjdXJl/LVBheW1lbnQtSWNv/bi5qcGc"
  },
  {
    title: "Special Discounts",
    text: "Regular promotions and special discounts for loyal customers.",
    image: "https://imgs.search.brave.com/8HY3hxxoPEvyToa89zpbBVgzPCona1JC2_i5GNiZ69A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzU5Lzg3LzU3/LzM2MF9GXzEyNTk4/NzU3MjdfZ0RBMTI0/ZmRhWjUyanp3eW1S/Vm1RZkNZaXJDT3dM/SFYuanBn"
  }
];

const Policy = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`container py-4 py-md-5 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} >
      <div className="row justify-content-center text-center g-3 g-md-4 mb-4 mb-md-5">
        <div className="col-12 mb-3 mb-md-4">
          <h2 className="display-5 display-md-4 fw-bold" style={{fontSize: 'clamp(1.75rem, 5vw, 2.5rem)'}}>Our Policies</h2>
          <p className="lead text-muted" style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}>We're committed to providing the best shopping experience</p>
        </div>

        {policies.map((policy, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div className="card h-100 shadow-sm hover-shadow transition">
              <img 
                src={policy.image} 
                className="card-img-top p-2 p-md-3" 
                alt={policy.title}
                style={{ height: 'clamp(150px, 25vw, 200px)', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column p-3 p-md-4">
                <h5 className="card-title fs-5 fs-md-4 mb-2 mb-md-3 text-truncate" style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}>{policy.title}</h5>
                <p className="card-text text-muted" style={{ 
                  WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  display: '-webkit-box',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}>{policy.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <section className={`py-4 py-md-5 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
        <div className="container py-3 py-md-5 ms-0 ms-md-5">
          <div className="row align-items-center">
            {/* Benefits Content - Full width on mobile, 6 columns on larger screens */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 display-md-4 fw-bold mb-3 mb-md-4" style={{fontSize: 'clamp(1.75rem, 5vw, 2.5rem)'}}>Shop with Confidence</h2>
              <div className="row g-3 g-md-4">
                <Benefit icon={<Shield className="text-white" />} bg="primary" title="Secure Payments" desc="SSL encrypted checkout" />
                <Benefit icon={<RefreshCw className="text-white" />} bg="success" title="Easy Returns" desc="30-day return policy" />
                <Benefit icon={<Award className="text-white" />} bg="info" title="Quality Guaranteed" desc="Premium materials only" />
                <Benefit icon={<CreditCard className="text-white" />} bg="warning" title="Flexible Payment" desc="Multiple payment options" />
              </div>
            </div>

            {/* VIP Club Card - Full width on mobile, 6 columns on larger screens */}
            <div className="col-12 col-lg-6">
              <div className={`card ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-lg rounded-4 p-3 p-md-4`}>
                <div className="text-center mb-3 mb-md-4">
                  <div className="rounded-circle mx-auto mb-2 mb-md-3 d-flex align-items-center justify-content-center" style={{ 
                    width: 'clamp(60px, 12vw, 80px)', 
                    height: 'clamp(60px, 12vw, 80px)', 
                    background: 'linear-gradient(45deg, #ff6b6b, #feca57)' 
                  }}>
                    <Heart className="w-5 h-5 w-md-6 h-md-6 text-white" />
                  </div>
                  <h5 className="fw-bold" style={{fontSize: 'clamp(1.125rem, 3vw, 1.25rem)'}}>Join Our VIP Club</h5>
                  <p className="text-muted" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Get exclusive access to sales and new arrivals</p>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="text-center p-2 p-md-3 bg-light rounded-3">
                      <strong className="text-primary" style={{fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'}}>20% OFF</strong>
                      <small className="d-block text-muted" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>First Order</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-2 p-md-3 bg-light rounded-3">
                      <strong className="text-success" style={{fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'}}>FREE</strong>
                      <small className="d-block text-muted" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>Shipping</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable benefit component
const Benefit = ({ icon, bg, title, desc }) => (
  <div className="col-md-6">
    <div className="d-flex align-items-start">
      <div className={`bg-${bg} rounded-circle p-2 me-2 me-md-3 d-flex align-items-center justify-content-center`} style={{ 
        width: 'clamp(35px, 8vw, 40px)', 
        height: 'clamp(35px, 8vw, 40px)' 
      }}>
        {icon}
      </div>
      <div>
        <h6 className="fw-bold" style={{fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'}}>{title}</h6>
        <small className="text-muted" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>{desc}</small>
      </div>
    </div>
  </div>
);

export default Policy;
