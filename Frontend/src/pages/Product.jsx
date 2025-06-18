import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css'; // Import your CSS file for styling
import categories from "./category";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from '../components/footer';
import { useDarkMode } from '../context/DarkModeContext';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category, subcategory } = useParams();
  const { darkMode } = useDarkMode();

 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching data', err);
      setError('Failed to load products. Please try again later.');
    }
  };


  useEffect(() => {
    fetchProducts();
    const handleProductAdded = () => {
      fetchProducts();
    };

    window.addEventListener('productAdded', handleProductAdded);
    return () => {
    window.removeEventListener('productAdded', handleProductAdded);
    };
  }, []);

  // Filter products when category/subcategory changes
  useEffect(() => {
    if (category && subcategory) {
      const filtered = products.filter(product => {
        const [productCategory, productSubcategory] = product.category.split(' > ');
        return productCategory === category && productSubcategory === subcategory;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, category, subcategory]);


const handleheartClick = (e) => {
  const icon = e.currentTarget.firstChild;
  icon.style.color = icon.style.color === 'red' ? 'white' : 'red';
};

  return (
    <div className="home">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="label-container mt-2" style={{backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa'}}>
            <div className="category-menu " style={{color: darkMode ? 'white' : 'black'}}>
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="menu-item">
                  <span className="category-title" style={{color: darkMode ? 'white' : 'black',backgroundColor: darkMode ? 'transparent' : 'f0f0f0',}}>{category}</span>
                  <div className="dropdown-content" style={{
                    backgroundColor: darkMode ? '#2d2d2d' : 'white',
                    border: darkMode ? '1px solid #444' : '1px solid #ddd'
                  }}>
                    {Object.entries(subcategories).map(([name, link]) => (
                      <Link 
                        key={name} 
                        to={`/products/${category}/${name}`}
                        className="dropdown-item"
                        style={{
                          color: darkMode ? '#e0e0e0' : 'black',
                          backgroundColor: darkMode ? '#2d2d2d' : 'white'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = darkMode ? '#404040' : '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = darkMode ? '#2d2d2d' : 'white';
                        }}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="product">
            {filteredProducts.length > 0 ? (
             filteredProducts.map((product) => (
                <div key={product._id} className="card">
                  <Link to={`/products/${product._id}`} className="product-link">
                    {/* // Update the image rendering part */}
                      <img 
                        src={
                          product.image && 
                          (typeof product.image === 'string' ? 
                            product.image : 
                            product.image.url)
                        } 
                        className="image1" 
                        alt={product.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/path/to/placeholder.jpg';
                        }}
                      />
                         </Link>
                        <button className="heart-button" >
                            
  
                            <FavoriteIcon onClick={handleheartClick} style={{fontSize:35}} />
                            </button>
                  <div className="card-body">
                    {/* <p className="card-title">{product.category}</p>
                    <p className="card-title ">{product.subcategory}</p> */}
                    <h5 className="card-title">
                      {product.name.length > 60 ? `${product.name.slice(0, 60)}...` : product.name}
                    </h5>
                    <p className="card-text">
                      {product.about.length > 60 ? `${product.about.slice(0, 60)}...` : product.about}
                    </p>
                    <div className="d-flex flex-column">
                      <p className="card-text fw-bold mb-0">₹{product.price}</p>
                      <p className="card-text fw-bold text-success mb-0">Bank Offer</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </>
      )}
      <div className="footer">
        <Footer/>
      </div>
    </div>
    
  );
};

export default Product;
