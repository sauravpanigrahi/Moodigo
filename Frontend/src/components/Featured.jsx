import React from 'react';
import { Shirt, Crown, ChevronRight, Gift } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

const FeaturedProduct = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const categories = [
    { name: "Women's Fashion", icon: <Shirt className="w-6 h-6 w-md-8 h-md-8" />, count: "2,500+ items",link: "/products/Fashion/Women" },
    { name: "Men's Fashion", icon: <Shirt className="w-6 h-6 w-md-8 h-md-8" />, count: "1,800+ items",link: "/products/Fashion/Men" },
    { name: "Accessories", icon: <Crown className="w-6 h-6 w-md-8 h-md-8" />, count: "950+ items",link: "/products/Fashion/Accessories" },
    { name: "Footwear", icon: <Gift className="w-6 h-6 w-md-8 h-md-8" />, count: "1,200+ items",link: "/products/Fashion/Footwear" }
  ];

  return (
    <section className="py-4 py-md-5">
      <div className={`container py-3 py-md-5 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
        <div className="text-center mb-4 mb-md-5">
          <h2 className="display-5 display-md-4 fw-bold mb-2 mb-md-3" style={{fontSize: 'clamp(1.75rem, 5vw, 2.5rem)'}}>Shop by Category</h2>
          <p className="lead text-muted" style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}>Explore our curated collections for every style and occasion</p>
        </div>
        <div className="row g-3 g-md-4">
          {categories.map((category, index) => (
            <div key={index} className="col-6 col-lg-3 col-md-6">
              <div
                className={`card border-0 ${darkMode ? 'bg-dark text-white' : 'bg-white'} shadow-sm rounded-4 p-3 p-md-4 h-100 text-center category-card`}
              >
                <div className="text-primary mb-2 mb-md-3">{category.icon}</div>
                <h5 className="fw-bold mb-1 mb-md-2" style={{fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)'}}>{category.name}</h5>
                <p className="text-muted mb-2 mb-md-3" style={{fontSize: 'clamp(0.75rem, 2vw, 1rem)'}}>{category.count}</p>
                <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => navigate(category.link)} style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>
                  Shop Now <ChevronRight className="w-3 h-3 w-md-4 h-md-4 ms-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
