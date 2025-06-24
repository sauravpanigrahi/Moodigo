import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './Productdetails.css';
import { toast } from 'react-toastify';
import Review from "../components/review";
import Footer from "../components/footer";
const ProductDetails = ({ setCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  // useEffect(() => {
  //   // Clear cart from localStorage
  //   localStorage.removeItem("cart");
  //   setCartCount(0);
  //   setIsAddedToCart(false);
  // }, []); // Run once when component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://moodigo-96i1.onrender.com/products/${id}`, {
          withCredentials: true,
        });
        setProduct(response.data);

        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        setIsAddedToCart(!!cart[id]);

        if (user && response.data.owner && user._id === response.data.owner._id) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error("Error fetching product details", err);
        toast.error("Failed to fetch product details");
      }
    };

    fetchData();
  }, [id, user]);

  const handleCartClick = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (!isAddedToCart) {
      cart[id] = true;
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsAddedToCart(true);
      setCartCount(Object.keys(cart).length);
      toast.success("Product added to cart!");
    } else {
      delete cart[id];
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsAddedToCart(false);
      setCartCount(Object.keys(cart).length);
      toast.error("Product removed from cart!");
    }

    // Notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { cart },
      bubbles: true,
      composed: true
    }));
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await axios.delete(`https://moodigo-96i1.onrender.com/products/${id}/delete`, {
        withCredentials: true,
      });

      // Remove from cart
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      delete cart[id];
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(Object.keys(cart).length);

      toast.success("Product deleted successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Error deleting the product", err);
      toast.error(err.response?.data?.error || "Failed to delete product");
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
    <div className="product-details-container">
      <div className="details">
        <div className="image">
          {/* <img src={product.image} alt={product.name || 'Product Image'} className="card-img-top" /> */}
          <img src={
                            product.image && 
                            (typeof product.image === 'string' ? 
                              product.image : 
                              product.image.url)
                          } 
                          className="card-img-top " 
                          alt={product.name} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/path/to/placeholder.jpg';
                          }}
                        />
        </div>
        <div className="card-body ">
          <h4 className="card-title " style={{marginLeft:30,fontSize: 30 }}>{product.name}</h4>
          <p className="card-title p">{product.about}</p>
          <p className="card-title p" style={{ fontSize: 30 }}>Price: ₹{product.price}</p>

          <div className="card-title p" style={{ lineHeight: 2 }}>
            <h5>Available offers</h5>
            <ul>
              <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
              <li>Special Price: Get extra 18% off</li>
              <li>Combo Offer: Buy 2 items save ₹40; Buy 3+ save ₹80</li>
              <li>EMI starting from ₹369/month</li>
            </ul>
          </div>

          <p className="card-title p">Category: {product.category}</p>
          <p className="card-title p">Subcategory: {product.subcategory}</p>
          <p className="card-title p">Seller: {product.owner?.email?.match(/^[^\d]+/)?.[0] || 'Unknown'}</p>

          {isOwner && (
            <>
              <Link to={`/products/${id}/edit`}>
                <button className="btn btn-primary mt-3 ms-4 me-2">Edit</button>
              </Link>
              <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
            </>
          )}

          <button
            className="btn mt-3 ms-5"
            onClick={handleCartClick}
            style={{
              backgroundColor: isAddedToCart ? 'green' : '#007bff',
              color: 'white'
            }}
          >
            {isAddedToCart ? 'Added to cart ✅' : 'Add to cart'}
          </button>
        </div>
      </div>
      <div className="review">
        <Review />
      </div>
     
    </div>
    <div className="footer">
        <Footer/>
      </div>
    </div>
  );
};

export default ProductDetails;
