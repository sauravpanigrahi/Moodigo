import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import './CartDetails.css';
import { useDarkMode } from '../context/DarkModeContext';
const CartDetails = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState(null);
    const [deletingItems, setDeletingItems] = useState(new Set());
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const { darkMode } = useDarkMode();
    // Function to fetch cart items
    const fetchCartItems = async (productIds) => {
        console.log('Fetching items for productIds:', productIds);
        if (!productIds || productIds.length === 0) {
            console.log('No product IDs provided, setting empty cart');
            setCartItems([]);
            return;
        }

        try {
            console.log('Making API requests for products:', productIds);
            const response = await Promise.all(
                productIds.map(async (id) => {
                    try {
                        console.log(`Fetching product ${id}...`);
                        const res = await axios.get(`https://moodigo-96i1.onrender.com/products/${id}`, {
                            withCredentials: true,
                        });
                        console.log(`Successfully fetched product ${id}:`, res.data);
                        return res;
                    } catch (error) {
                        console.error(`Error fetching product ${id}:`, error.response?.data || error.message);
                        throw error;
                    }
                })
            );
            const responseData = response.map(res => res.data);
            console.log('API Response data:', responseData);
            console.log('Setting cart items with:', responseData);
            setCartItems(responseData);
        } catch (err) {
            console.error("Error fetching product details:", err);
            console.error("Error details:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            toast.error("Failed to load cart items");
            setCartItems([]); // Set empty array on error
        }
    };

    // Function to fetch address
    // const fetchAddress = async () => {
    //     try {
    //         const response = await axios.get('https://moodigo-96i1.onrender.com/Address', {
    //             withCredentials: true
    //         });
    //         if (response.data && response.data.length > 0) {
    //             const lastIdx = response.data.length - 1;
    //             const latestAddress = response.data.length > 1 ? response.data[lastIdx] : response.data[0];
    //             setAddress(latestAddress);
    //         }
    //     } catch (err) {
    //         console.error("Error fetching address:", err);
    //     }
    // };
    const fetchAddress = async () => {
    try {
        const response = await axios.get('https://moodigo-96i1.onrender.com/Address', {
            withCredentials: true
        });
        
        if (response.data && response.data.length > 0) {
            // Set ALL addresses instead of just the latest one
            setAddress(response.data); // This will store the entire array
            console.log('All addresses fetched:', response.data); // Debug log
        } else {
            setAddress([]); // Empty array if no addresses
        }
    } catch (err) {
        console.error("Error fetching address:", err);
        setAddress([]); // Set empty array on error
    }
};

    // Initial load and cart update handler
    useEffect(() => {
        const handleCartUpdate = (event) => {
            console.log('Cart update event received:', event.detail);
            const updatedCart = event.detail.cart;
            console.log('Updated cart from event:', updatedCart);
            const productIds = Object.keys(updatedCart);
            console.log('Product IDs from updated cart:', productIds);
            fetchCartItems(productIds);
        };

        // Initial load
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
        console.log('Initial stored cart from localStorage:', storedCart);
        const productIds = Object.keys(storedCart);
        console.log('Initial product IDs from localStorage:', productIds);
        
        if (productIds.length === 0) {
            console.log('No items in cart');
            setCartItems([]);
        } else {
            console.log('Fetching items for product IDs:', productIds);
            fetchCartItems(productIds);
        }
        
        fetchAddress();

        // Add event listener
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            setDeletingItems(prev => new Set([...prev, id]));
            setCartItems(prev => prev.filter(item => item._id !== id));
            
            const updatedCart = JSON.parse(localStorage.getItem("cart")) || {};
            delete updatedCart[id];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            
            // Dispatch cart update event
            window.dispatchEvent(new CustomEvent('cartUpdated', { 
                detail: { cart: updatedCart },
                bubbles: true,
                composed: true
            }));
            
            toast.success("Product removed from cart!");
        } catch (err) {
            console.error("Error removing product from cart:", err);
            toast.error("Failed to remove product. Please try again.");
            setCartItems(prev => [...prev, cartItems.find(item => item._id === id)]);
        } finally {
            setDeletingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }

    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => (
            total += item.price
        ));
        return total;
    }

    const handleAddress = () => {
        if(!user){
        toast.error("You need to log in to add a address.");2
      navigate('/login');
        }else{
        
        navigate("/Address")
        }
    }
    const handleAddressdelete = async (addressId) => {
        try {
            if (!addressId) {
                toast.error('No address to delete');
                return;
            }

            await axios.delete(`https://moodigo-96i1.onrender.com/Address/delete/${addressId}`, {
                withCredentials: true
            });
            
            setAddress(prev=>prev.filter(addr=> addr._id !== addressId));
            toast.success('Address deleted successfully!');
        } catch (err) {    
            toast.error(err.response?.data?.error || 'Failed to delete address');
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className='empty-cart'>
                    <ShoppingCartIcon className='empty-cart-icon' />
                    <h2>Your cart is empty!</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

   return (
        <div className="cart-container">
            <div className="cart-content">
                <div className="cart-items-section" style={{backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa'}}>
                    {/* Display ALL addresses */}
                    {address.length > 0 && (
                        <div className="addresses-section" >
                            <h3>Delivery Addresses</h3>
                            {address.map((singleAddress, index) => (
                                <div key={singleAddress._id || index} className="delivery-address" style={{backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa'}}>
                                    <LocationOnIcon className="address-icon" />
                                    <div className="address-details">
                                        <h4>Delivery to: {singleAddress.name}</h4>
                                        <p>Email: {singleAddress.email}</p>
                                        <p>Phone: {singleAddress.number}</p>
                                        <p>{singleAddress.address}, {singleAddress.city}, {singleAddress.state} - {singleAddress.pincode}</p>
                                    </div>
                                    <div className='ms-auto me-2' onClick={() => handleAddressdelete(singleAddress._id)}>
                                        <button className='delete-btn'>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {cartItems.map((item) => (
                        <div key={item._id} className={`cart-item ${deletingItems.has(item._id) ? 'deleting' : ''}`}>
                            <div className="item-image">
                                 <img
                                    src={
                                        item.image && 
                                        (typeof item.image === 'string'
                                        ? item.image
                                        : item.image.url)
                                    }
                                    className="image1"
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/path/to/placeholder.jpg'; // Replace with your real fallback image path
                                    }}
                                    />

                            </div>
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="category">{item.category}</p>
                                <p className="description">
                                    {item.about.length > 100 ? item.about.slice(0, 100) + "..." : item.about}
                                </p>
                                <p className="price">₹{item.price}</p>
                            </div>
                            <div className="item-actions">
                                <button 
                                    className={`delete-btn ${deletingItems.has(item._id) ? 'deleting' : ''}`}
                                    onClick={() => handleDelete(item._id)}
                                    disabled={deletingItems.has(item._id)}
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-card" style={{backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa'}}>
                        <h3>Price Details</h3>
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>₹{calculateTotalPrice()}</span>
                            </div>
                            <div className="price-row">
                                <span>Tax</span>
                                <span>₹50</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery</span>
                                <span>₹20</span>
                            </div>
                            <div className="price-row">
                                <span>Platform Fees</span>
                                <span>₹5</span>
                            </div>
                            <div className="price-row total">
                                <span>Total Amount</span>
                                <span>₹{calculateTotalPrice() + 50 + 20 + 5}</span>
                            </div>
                        </div>
                        <button className="pay-now-btn">
                            <PaymentIcon />
                            Pay Now
                        </button>
                    </div>

                    <div className="address-card" onClick={handleAddress} style={{backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa'}}>
                        <div className="address-content">
                            <h3 style={{color: darkMode ? 'white' : 'black'}}>{address.length > 0 ? 'Update Contact' : 'Add your Contact'}</h3>
                            <AddCircleOutlineIcon className="add-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;