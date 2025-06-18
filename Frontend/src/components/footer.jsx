import React from 'react';
import { Users, Heart, Star } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer className={`py-4 py-md-5 ${darkMode ? 'bg-dark border-top border-secondary text-white' : 'bg-white border-top'}`}>
      <div className="container">
        <div className="row g-4">
          {/* Brand Section - Full width on mobile, 4 columns on larger screens */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <h5
              className="fw-bold mb-3 text-center text-lg-start"
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              Moodigo
            </h5>
            <p className={`${darkMode ? 'text-light' : 'text-muted'} text-center text-lg-start`}>
              Your ultimate destination for trendy fashion and accessories that match your unique style and mood.
            </p>
          </div>
          
          {/* Shop Section - 6 columns on mobile, 2 columns on larger screens */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-center text-lg-start">Shop</h6>
            <ul className="list-unstyled text-center text-lg-start">
              <li className="mb-2"><a href="/products/Fashion/Women" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Women's Fashion</a></li>
              <li className="mb-2"><a href="/products/Fashion/Men" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Men's Fashion</a></li>
              <li className="mb-2"><a href="/products/Fashion/Accessories" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Accessories</a></li>
            </ul>
          </div>
          
          {/* Company Section - 6 columns on mobile, 2 columns on larger screens */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-center text-lg-start">Company</h6>
            <ul className="list-unstyled text-center text-lg-start">
              <li className="mb-2"><a href="#" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>About Us</a></li>
              <li className="mb-2"><a href="#" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Careers</a></li>
              <li className="mb-2"><a href="" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Press</a></li>
              <li className="mb-2"><a href="/contact" className={`${darkMode ? 'text-light' : 'text-muted'} text-decoration-none`}>Contact</a></li>
            </ul>
          </div>
          
          {/* Follow Us Section - Full width on mobile, 2 columns on larger screens */}
          <div className="col-12 col-lg-2 mt-4 mt-lg-0">
            <h6 className="fw-bold mb-3 text-center text-lg-start">Follow Us</h6>
            <div className="d-flex gap-2 justify-content-center justify-content-lg-start">
              <button className="btn btn-outline-secondary btn-sm rounded-circle">
                <Users className="w-4 h-4" />
              </button>
              <button className="btn btn-outline-secondary btn-sm rounded-circle">
                <Heart className="w-4 h-4" />
              </button>
              <button className="btn btn-outline-secondary btn-sm rounded-circle">
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className={`${darkMode ? 'text-light' : 'text-muted'} mb-0`}>© 2025 Moodigo Fashion. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <small className={`${darkMode ? 'text-light' : 'text-muted'}`}>Made with ❤️ for fashion lovers</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
