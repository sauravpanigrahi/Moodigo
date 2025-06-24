import React from 'react';
import { ShoppingBag, Smartphone, CheckCircle } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const { darkMode } = useDarkMode();
  const navigate=useNavigate();
  const handleButton=()=>{
    navigate('/products')
  }
  
  return (
    <section
      className="py-5"
      style={{
        background: darkMode ? 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)' : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      }}
    >
      <div className="container py-5 text-center text-white">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="display-4 fw-bold mb-4">Ready to Transform Your Wardrobe?</h2>
            <p className="lead mb-5 opacity-90">
              Join thousands of fashion enthusiasts who shop with <strong>Moodigo</strong> for the latest trends and unbeatable prices.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow" aria-label="Shop Now" onClick={handleButton}>
                <ShoppingBag className="me-2" />
                Shop Now
              </button>
              {/* <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill" aria-label="Download App">
                <Smartphone className="me-2" />
                Download App
              </button> */}
            </div>
            <p className="mt-4 opacity-75">
              <CheckCircle className="me-2" />
              Free shipping on orders over ₹50 • 30-day returns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
