import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../config/axioss';
import { toast } from 'react-toastify';
import categories from './category';
import { useDarkMode } from '../context/DarkModeContext';
const Listing = () => {
  const { darkMode } = useDarkMode();
  const [products, setProducts] = useState({
    name: '',
    about: '',
    price: 0,
    category: '',
    subcategory: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      toast.error("You need to log in to add a product.");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProducts(prevState => ({
      ...prevState,
      [id]: value,
      // Reset subcategory when category changes
      ...(id === 'category' && { subcategory: '' })
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  // Validation: Ensure either image file or URL is provided
  if (!imageFile && !imageURL.trim()) {
    toast.error('Please provide either an image file or image URL.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', products.name);
    formData.append('about', products.about);
    formData.append('price', products.price);
    formData.append('category', products.category);
    formData.append('subcategory', products.subcategory);

    // Handle image - prioritize file upload over URL
    if (imageFile) {
      formData.append('imageFile', imageFile);
    } else {
      formData.append('image', imageURL.trim());
    }

    // Update the handleSubmit function to properly handle the response
const response = await axiosInstance.post('/addproduct', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
});

// Dispatch event with the new product data
const event = new CustomEvent('productAdded', {
  detail: response.data.product
});
window.dispatchEvent(event);

    // Reset form after successful submission
    setProducts({
      name: '',
      about: '',
      price: 0,
      category: '',
      subcategory: '',
    });
    setImageFile(null);
    setImageURL('');
    setImagePreview('');

    toast.success('Product created successfully!');
    navigate('/products');
  } catch (err) {
    console.error('Error creating product:', err);
    toast.error(err.response?.data?.error || 'Failed to create product. Please try again.');
  }
};

  // Clear file input when URL is entered
  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);
    if (url.trim()) {
      setImageFile(null);
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  // Clear URL input when file is selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImageURL('');
      // Create preview for uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  return (
    <>
      <div className="container offset-3 col-6 mt-3 mb-3" style={{
        boxShadow: darkMode ? "0 4px 6px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(255, 255, 255, 0.8)" : "0 4px 6px rgba(0, 0, 0.2, 0.4), 0 1px 3px rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: darkMode ? '#1a1a1a' : 'white'
      }}>
        <h1>New Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-control" 
              value={products.name}
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="about" className="form-label">Description</label>
            <textarea 
              id="about" 
              className="form-control" 
              value={products.about}
              onChange={handleChange} 
              required 
              rows="3"
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="Paste image URL (optional)"
              value={imageURL}
              onChange={handleImageURLChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Or Upload Image File</label>
            <input
              type="file"
              name="imageFile" 
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="form-group mb-3">
              <label className="form-label">Image Preview</label>
              <div className="text-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          )}

          <div className="form-group mb-3">
            <label htmlFor="price" className="form-label">Price (₹)</label>
            <input 
              type="number" 
              id="price" 
              className="form-control" 
              value={products.price}
              onChange={handleChange} 
              min="0"
              step="0.01"
              required 
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select 
              id="category" 
              className="form-control" 
              value={products.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {products.category && (
            <div className="form-group mb-3">
              <label htmlFor="subcategory" className="form-label">Subcategory</label>
              <select
                id="subcategory"
                className="form-control"
                value={products.subcategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Subcategory</option>
                {Object.keys(categories[products.category]).map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary submit-button">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default Listing;