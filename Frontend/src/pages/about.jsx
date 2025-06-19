// React component rewritten to use Bootstrap 5 classes and manual CSS (no Tailwind)
import React, { useState, useEffect } from 'react';
import './aboutus.css';
import { Sparkles, Smartphone, Shirt, Users, Target, Zap, Heart, Star, Palette, Sun, Moon } from 'lucide-react';

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themes = [
    {
      name: "Warm Sunset",
      primary: "#fd7e14",
      secondary: "#ff7043",
      accent: "#ff5722",
    },
    {
      name: "Forest Green",
      primary: "#2e7d32",
      secondary: "#66bb6a",
      accent: "#43a047",
    },
    {
      name: "Ocean Blue",
      primary: "#1565c0",
      secondary: "#42a5f5",
      accent: "#1e88e5",
    },
    {
      name: "Monochrome",
      primary: "#212121",
      secondary: "#424242",
      accent: "#616161",
    },
    {
      name: "Rose Gold",
      primary: "#e91e63",
      secondary: "#ffc107",
      accent: "#f06292",
    }
  ];

  const theme = themes[currentTheme];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '1000+', label: 'Products', icon: Shirt },
    { number: '99.9%', label: 'Uptime', icon: Zap },
    { number: '4.9/5', label: 'Rating', icon: Star }
  ];

  const values = [
    {
      icon: Target,
      title: 'Style Meets Function',
      description: 'We believe fashion and functionality should never be mutually exclusive.'
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description: 'Your satisfaction drives everything we do.'
    },
    {
      icon: Sparkles,
      title: 'Innovation First',
      description: 'We stay ahead of trends and technology.'
    }
  ];

  return (
    <div className={isDarkMode ? 'aboutus dark-mode' : 'aboutus'}>
      

      <section className="container-fluid text-center py-5">
        <h1 className="display-2 fw-bold" style={{ color: theme.primary }}>Moodigo</h1>
        <p className="lead">Where your mood meets style. Discover fashion and mobile accessories that reflect your unique personality.</p>
        <div className="row my-5 justify-content-center">
          {[Shirt, Smartphone, Sparkles].map((Icon, i) => (
            <div key={i} className="col-4 col-md-2">
              <div className="p-3 border rounded-circle bg-white shadow-sm">
                <Icon size={32} color={theme.primary} />
              </div>
            </div>
          ))}
        </div>

        <div className="row row-cols-2 row-cols-md-4 g-4">
          {stats.map((s, i) => (
            <div className="col" key={i}>
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <s.icon size={28} color={theme.accent} className="mb-2" />
                  <h5 className="card-title fw-bold">{s.number}</h5>
                  <p className="card-text">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5" style={{ color: theme.primary }}>Our Story</h2>
          <p className="lead text-center mb-4">Born from the belief that style should be as dynamic as your mood, Moodigo emerged as a revolutionary platform...</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5" style={{ color: theme.secondary }}>What Drives Us</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {values.map((v, i) => (
              <div className="col" key={i}>
                <div className="card h-100 shadow-sm text-center p-4">
                  <div className="mb-3 mx-auto" style={{ width: '64px', height: '64px', backgroundColor: theme.primary, borderRadius: '1rem' }}>
                    <v.icon className="text-white" size={32} />
                  </div>
                  <h5 className="card-title fw-bold">{v.title}</h5>
                  <p className="card-text">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="display-5 fw-bold mb-4" style={{ color: theme.primary }}>Ready to Express Your Mood?</h2>
          <p className="lead mb-4">Join thousands of style enthusiasts who've discovered their perfect blend of fashion and functionality.</p>
          <button className="btn btn-lg text-white" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>Start Shopping</button>
        </div>
      </section>

      <footer className="bg-dark text-light py-4 text-center">
        <div className="container">
          <h5 className="mb-2">Moodigo</h5>
          <small>Where your mood meets style. © 2024 Moodigo. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
