import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import AccountMenu from '../components/Account';
import { useDarkMode } from '../context/DarkModeContext';
import '../App.css';

const Navbar = ({ cartCount }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleCart = () => {
    navigate('/cartdetails');
  };
  const handleclick = () => {
    navigate('/products');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container-fluid">

        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "auto", height: "40px", objectFit: "contain" }}
            className="d-inline-block align-text-top d-none d-lg-flex ms-5"
          /> */}
          <span
            className="ms-2 fw-bold fs-3  brand-name"
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Moodigo
          </span>
        </Link>
        
        {/* Right-side controls: Dark Mode + Navbar Toggler */}
        <div className="d-flex align-items-center ms-auto gap-2 darkbutton">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => toggleDarkMode()}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        
          {/* Search Bar - Center */}
          <div className="navbar-nav mx-auto d-none d-lg-block">
            <TextField
              variant="outlined"
              placeholder="Search for clothes & accessories..."
              size="small"
              sx={{
                width: '400px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#e9ecef',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          

          {/* Right Side Actions */}
          <div className="navbar-nav ms-auto d-flex flex-wrap flex-row align-items-center gap-2 gap-md-3"> {/* ✅ UPDATED: allow wrapping on small screens */}
            {/* Account Menu */}
            <div className="nav-item">
              <AccountMenu />
            </div>

            {/* Shopping Cart */}
            <div className="nav-item">
              <IconButton
                onClick={handleCart}
                sx={{
                  color: '#495057',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Badge
                  badgeContent={cartCount}
                  color="primary"
                  overlap="circular"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>

            {/* Shop Now Button */}
            <div className="nav-item d-none d-lg-block">
              <button
                className="btn btn-outline-primary px-3 py-2 rounded-pill"
                style={{
                  borderColor: '#ff6b6b',
                  color: '#ff6b6b',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ff6b6b';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'translateY(0)';
                }}
                onClick={handleclick}
              >
                Shop Now
              </button>
              
            </div>

            {/* Dark Mode Button - Now visible on mobile too */}
           
          </div>
        </div>

        {/* Mobile Search - Show only on mobile */}
        <div className="d-lg-none w-100 mt-3">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#f8f9fa',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6c757d' }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .navbar {
          transition: all 0.3s ease-in-out;
        }
        

        .navbar-brand:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }

        .btn {
          transition: all 0.2s ease-in-out;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 991.98px) {
          .navbar-collapse {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #dee2e6;
          }
         
        body.dark-mode {
          background-color: #121212;
          color: #f1f1f1;
        }

        body.dark-mode .navbar {
          background-color: #1e1e1e !important;
        }

        body.dark-mode .btn-outline-primary {
          border-color: #feca57;
          color: #feca57;
        }

        body.dark-mode .btn-outline-primary:hover {
          background-color: #feca57;
          color: #121212;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
