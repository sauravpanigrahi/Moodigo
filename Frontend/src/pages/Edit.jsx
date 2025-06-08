import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import categories from './category';

const Edit = () => {
  const [product, setProduct] = useState({
    name: '',
    about: '',
    price: 0,
    category: '',
    subcategory: '',
    image: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/check-auth', {
          withCredentials: true
        });
        
        if (!response.data.isAuthenticated) {
          toast.error("You need to log in to edit a product.");
          navigate('/login');
          return;
        }
        
        // Verify if the user is the owner of the product
        const productResponse = await axios.get(`http://localhost:3000/products/${id}/edit`, {
          withCredentials: true
        });
        
        const productData = productResponse.data;
        // Split category string into main category and subcategory
        const [mainCategory, subcategory] = productData.category.split(' > ');
        setProduct({
          ...productData,
          category: mainCategory,
          subcategory: subcategory
        });
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 403) {
          toast.error("You don't have permission to edit this product");
        } else {
          toast.error('Failed to load product details');
        }
        navigate('/products');
      }
    };

    checkAuth();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [id]: value,
      // Reset subcategory when category changes
      ...(id === 'category' && { subcategory: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...product,
        category: `${product.category} > ${product.subcategory}`
      };

      await axios.put(`http://localhost:3000/products/${id}`, productData, {
        withCredentials: true
      });
      
      toast.success('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch (err) {
      console.error('Error updating product:', err);
      if (err.response?.status === 403) {
        toast.error("You don't have permission to edit this product");
      } else {
        toast.error('Failed to update product. Please try again.');
      }
    }
  };

  return (
    <div className="container offset-3 col-6 mt-3 mb-3" style={{
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2, 0.4), 0 1px 3px rgba(0, 0, 0, 0.8)",
      borderRadius: "8px",
      padding: "1rem",
      backgroundColor: "white"
    }}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
            value={product.name}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="about" className="form-label">Description</label>
          <input 
            type="text" 
            id="about" 
            className="form-control" 
            value={product.about}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input 
            type="text" 
            id="image" 
            className="form-control" 
            value={product.image}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input 
            type="number" 
            id="price" 
            className="form-control" 
            value={product.price}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select 
            id="category" 
            className="form-control" 
            value={product.category} 
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

        {product.category && (
          <div className="form-group mb-3">
            <label htmlFor="subcategory" className="form-label">Subcategory</label>
            <select
              id="subcategory"
              className="form-control"
              value={product.subcategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Subcategory</option>
              {Object.keys(categories[product.category]).map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <button type="submit" className="btn btn-primary submit-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Edit;
