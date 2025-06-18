import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

// Lucide React Icons
import { 
  ShoppingBag, 
  Shirt, 
  Crown, 
  Truck, 
  Shield, 
  Users,
  Smartphone,
  Star,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  ArrowRight,
  Zap,
  Moon,
  Sun,
  Heart,
  Search,
  Filter,
  Sparkles,
  Award,
  RefreshCw,
  CreditCard,
  Gift
} from 'lucide-react';

const LearnMore = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-16 h-16 text-primary" />,
      title: "AI Style Recommendations",
      description: "Get personalized outfit suggestions based on your style preferences, body type, and latest fashion trends."
    },
    {
      icon: <Search className="w-16 h-16 text-success" />,
      title: "Smart Search & Filter",
      description: "Find exactly what you're looking for with our advanced search and filtering system. Sort by size, color, brand, and price."
    },
    {
      icon: <Truck className="w-16 h-16 text-info" />,
      title: "Fast & Free Delivery",
      description: "Enjoy free shipping on orders over $50 and express delivery options. Track your order in real-time."
    }
  ];

  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Fashion Blogger",
      content: "Moodigo has the best collection of trendy clothes! The quality is amazing and delivery is super fast.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Style Enthusiast",
      content: "Love the personalized recommendations! Moodigo always knows exactly what I'm looking for.",
      rating: 5
    },
    {
      name: "Sarah Kim",
      role: "Professional Stylist",
      content: "My go-to platform for clients. Great variety, excellent quality, and unbeatable prices.",
      rating: 5
    }
  ];

  

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} sticky-top shadow-sm`}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="#" style={{background: 'linear-gradient(45deg, #ff6b6b, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Moodigo
          </a>
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => toggleDarkMode()}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="btn btn-outline-primary px-3 py-2 rounded-pill">
              <ShoppingBag className="w-4 h-4 me-1" />
              Shop Now
            </button>
            <button className="btn btn-primary px-4 py-2 rounded-pill">
              Sign Up <ArrowRight className="w-4 h-4 ms-1" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
     

      {/* Categories Section */}
      

      {/* Features Section */}
      <section className={`py-5 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Why Choose Moodigo?</h2>
            <p className="lead text-muted">Experience the future of online fashion shopping</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4">
                <div 
                  className={`card h-100 border-0 shadow-sm rounded-4 p-4 transition-all ${
                    activeFeature === index ? 'shadow-lg transform-scale-105' : ''
                  }`}
                  style={{
                    background: activeFeature === index 
                      ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' 
                      : darkMode ? '#2d3748' : 'white',
                    color: activeFeature === index ? 'white' : 'inherit',
                    transform: activeFeature === index ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                    <p className={activeFeature === index ? 'text-white-50' : 'text-muted'}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row g-4 text-center">
            <div className="col-lg-3 col-md-6">
              <div className={`card border-0 ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-sm rounded-4 p-4`}>
                <h2 className="display-4 fw-bold text-primary mb-2">50K+</h2>
                <p className="text-muted mb-0">Happy Customers</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className={`card border-0 ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-sm rounded-4 p-4`}>
                <h2 className="display-4 fw-bold text-success mb-2">5K+</h2>
                <p className="text-muted mb-0">Fashion Items</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className={`card border-0 ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-sm rounded-4 p-4`}>
                <h2 className="display-4 fw-bold text-info mb-2">200+</h2>
                <p className="text-muted mb-0">Top Brands</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className={`card border-0 ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-sm rounded-4 p-4`}>
                <h2 className="display-4 fw-bold text-warning mb-2">24/7</h2>
                <p className="text-muted mb-0">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-5 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Shop with Confidence</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle p-2 me-3">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold">Secure Payments</h6>
                      <small className="text-muted">SSL encrypted checkout</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-success rounded-circle p-2 me-3">
                      <RefreshCw className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold">Easy Returns</h6>
                      <small className="text-muted">30-day return policy</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-info rounded-circle p-2 me-3">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold">Quality Guaranteed</h6>
                      <small className="text-muted">Premium materials only</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <div className="bg-warning rounded-circle p-2 me-3">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold">Flexible Payment</h6>
                      <small className="text-muted">Multiple payment options</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`card ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-lg rounded-4 p-4`}>
                <div className="text-center mb-4">
                  <div className="bg-gradient-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', background: 'linear-gradient(45deg, #ff6b6b, #feca57)'}}>
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h5 className="fw-bold">Join Our VIP Club</h5>
                  <p className="text-muted">Get exclusive access to sales and new arrivals</p>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-3">
                      <strong className="text-primary">20% OFF</strong>
                      <small className="d-block text-muted">First Order</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-3">
                      <strong className="text-success">FREE</strong>
                      <small className="d-block text-muted">Shipping</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">What Our Customers Say</h2>
            <p className="lead text-muted">Real reviews from fashion lovers worldwide</p>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4">
                <div className={`card border-0 ${darkMode ? 'bg-secondary' : 'bg-white'} shadow-sm rounded-4 p-4 h-100`}>
                  <div className="d-flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 fst-italic">"{testimonial.content}"</p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <span className="text-white fw-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{background: darkMode ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'}}>
        <div className="container py-5 text-center text-white">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-4 fw-bold mb-4">Ready to Transform Your Wardrobe?</h2>
              <p className="lead mb-5 opacity-90">
                Join thousands of fashion enthusiasts who shop with Moodigo for the latest trends and unbeatable prices.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow">
                  <ShoppingBag className="w-5 h-5 me-2" />
                  Shop Now
                </button>
                <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  <Smartphone className="w-5 h-5 me-2" />
                  Download App
                </button>
              </div>
              <p className="mt-4 opacity-75">
                <CheckCircle className="w-4 h-4 me-1" />
                Free shipping on orders over $50 • 30-day returns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-5 ${darkMode ? 'bg-dark border-top border-secondary' : 'bg-white border-top'}`}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="fw-bold mb-3" style={{background: 'linear-gradient(45deg, #ff6b6b, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Moodigo
              </h5>
              <p className="text-muted">
                Your ultimate destination for trendy fashion and accessories that match your unique style and mood.
              </p>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Shop</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Women's Fashion</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Men's Fashion</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Accessories</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Sale</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Customer Care</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Size Guide</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Shipping Info</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Returns</a></li>
                <li><a href="#" className="text-muted text-decoration-none">FAQ</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">About Us</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Press</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="fw-bold mb-3">Follow Us</h6>
              <div className="d-flex gap-2">
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
            <div className="col-md-6">
              <p className="text-muted mb-0">© 2025 Moodigo Fashion. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">Made with ❤️ for fashion lovers</small>
            </div>
          </div>
        </div>
      </footer>

      {/* Bootstrap CSS CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <style jsx>{`
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
        
        .transform-scale-105:hover {
          transform: scale(1.02);
        }
        
        .btn {
          transition: all 0.2s ease-in-out;
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .card {
          transition: all 0.3s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-5px);
        }
        
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .fill-current {
          fill: currentColor;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        
        .animate__fadeInRight {
          animation-name: fadeInRight;
        }
      `}</style>
    </div>
  );
};

export default LearnMore;