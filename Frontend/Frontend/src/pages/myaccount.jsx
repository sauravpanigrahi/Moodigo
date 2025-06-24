import React from "react";
import './myaccount.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// Add these imports for the icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Logout from "./Logout";
import { useDarkMode } from '../context/DarkModeContext';
const MyAccount = () => {
    const [currUser, setCurrUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selecedsection, setselectedSection] = useState('profile');
    const [address, setaddress] = useState([]);
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();
    // Add this function to handle address deletion
    const handleAddressdelete = async (addressId) => {
        try {
            if (!addressId) {
                toast.error('No address to delete');
                return;
                }
             await axios.delete(`https://moodigo-96i1.onrender.com/Address/delete/${addressId}`, {
                withCredentials: true,
            });
           
                // Remove the deleted address from the state
                setaddress(prev=>prev.filter(addr => addr._id !== addressId));
                toast.success('Address deleted successfully');
            
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address');
        }
    };

    // Check authentication status on component mount and after refreshes
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://moodigo-96i1.onrender.com/check-auth', {
                    withCredentials: true,
                });

                if (response.data.isAuthenticated) {
                    setCurrUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } else {
                    setCurrUser(null);
                    localStorage.removeItem('user');
                }

                // Fetch addresses
                const storeaddress = await axios.get('https://moodigo-96i1.onrender.com/Address', {
                    withCredentials: true,
                });
                
                console.log('Address response:', storeaddress.data); // Debug log
                
                if (storeaddress.data && storeaddress.data.length > 0) {
                    setaddress(storeaddress.data);
                } else {
                    setaddress([]);
                }
                setIsLoading(false);

            } catch (error) {
                console.error('Authentication check failed:', error);
                setCurrUser(null);
                localStorage.removeItem('user');
                toast.error('Authentication check failed. Please try logging in again.');
                setaddress([]);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
        // Removed interval for auth check
        // const intervalId = setInterval(checkAuthStatus, 30000);
        // return () => clearInterval(intervalId);
    }, []);

    // Listen for storage events (for when user logs in/out in another tab)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    try {
                        setCurrUser(JSON.parse(e.newValue));
                    } catch (error) {
                        console.error('Error parsing user data:', error);
                        setCurrUser(null);
                    }
                } else {
                    setCurrUser(null);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Listen for custom login event
    useEffect(() => {
        const handleLoginSuccess = (e) => {
            if (e.detail && e.detail.user) {
                setCurrUser(e.detail.user);
            }
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);
        return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
    }, []);
    const handleAddress = () => {
            navigate("/Address")
            
        }
        const handleLogout =  () => {
            navigate("/Logout");
        }

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (!currUser) {
        return <div className="not-authenticated">Please log in to view your profile</div>;
    }

    return (
        <div className={`profile-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="profile">
                <div className="account-info">
                    <div className="avatar">
                       
                    </div>
                    <div className="userName row ms-1">
                        <div className="col-3 mb-3">
                             <Avatar>{currUser ? currUser.Firstname?.[0]?.toUpperCase() || 'U' : 'G'}</Avatar> 
                        </div>
                        <div className="col-8">
                              hello, 
                    <strong><p> {currUser?.Firstname && currUser?.Lastname ? `${currUser.Firstname} ${currUser.Lastname}`: currUser.email.split('@')[0]}</p></strong>
                        </div>
                      
                    </div>
                    <div className="name">
                        <h4 className="h4 "> <AccountBoxIcon/>   ACCOUNT SETTINGS</h4>
                        <p className="p mt-4" onClick={() => setselectedSection('profile')}>Profile information</p>
                        <p className="p" onClick={() => setselectedSection('address')}>Managed Address</p>
                        <hr/>
                        <h4 className="h4"> <AccountBalanceWalletIcon /> PAYMENTS</h4>
                        <p className="p mt-3">Gift Cards</p>
                        <p className="p">Saved UPI</p>
                        <p className="p">Saved Cards</p>
                        <hr/>
                        <button className="log mt-4"  onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="account-info-details">
                    {/* <h3>Account Details</h3> */}
                    {selecedsection === 'profile' && (
                        <>
              <div className="profile-detail ms-5 mt-4">
                <h4>Personal Information</h4>
                    <div className= " mt-4 " style={{display:'flex',gap:'5rem',marginBottom:'20px',width:"100%",color: darkMode ? 'white' : 'black'}}>
                  <TextField id="outlined-basic" label="First Name" variant="outlined" value={currUser.Firstname} style={{width:"32%"}}  disabled />
                    <TextField id="outlined-basic" label="Last Name "  value={currUser.Lastname}variant="outlined"  disabled />
                          </div>
                <h4>Email Address</h4>
                       <div className="mt-4"  style={{display:'flex',width:"100%",gap:'3rem',marginBottom:'20px',fontSize:'1.2rem',}} >
                      <TextField id="outlined-basic" label="email"  value={currUser.email} variant="outlined" style={{width:"37%"}}  disabled />
                       <TextField id="outlined-basic" label="phone number "  value={currUser.phonenumber} variant="outlined"  disabled  />
                       </div>
                                
                                {/* <p><strong>Email:</strong> {currUser.email}</p>
                                <p><strong>Username:</strong> {currUser.username}</p> */}
                            </div>
                        </>
                    )}
                    {selecedsection === 'address' && (
                        <>
                         
                            <div className="address-detail  ms-4 mt-4 me-4">
                                <h4>Manage Addresses</h4>
                                <div className="address-card mb-3 mt-4"style={{border:'1px solid black'}} onClick={handleAddress}>
                                    <div className="address-content">
                                    <h3 style={{color: darkMode ? 'white' : 'black'}}> Add new Address</h3>
                                        <AddCircleOutlineIcon className="add-icon" />
                                    </div>
                                    </div>
                                {address.length === 0 ? (
                                    <p className="mt-">No address found</p>
                                ) : (
                                    address.map((addr, index) => (
                                        <div key={addr._id || index} className="delivery-address mt-5 " style={{border:'1px solid black'}}>
                                            <LocationOnIcon className="address-icon" />
                                            <div className="address-details">
                                                <h4>Delivery to: {addr.name}</h4>
                                                <p>Email: {addr.email}</p>
                                                <p>Phone: {addr.number}</p>
                                                <p>{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                                </div>
                                                <div className='ms-auto me-2'>
                                                <button className='delete-btn'
                                                        onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('Delete button clicked for address ID:', addr._id); // Debug log
                                                        handleAddressdelete(addr._id);
                                                    }}type="button">
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                     </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyAccount;