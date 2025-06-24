import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDarkMode } from '../context/DarkModeContext';
export default function AccountMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const open = Boolean(anchorEl);
    const { darkMode } = useDarkMode();

    // Check authentication status on component mount and after refreshes
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://moodigo-96i1.onrender.com/check-auth', {
                    withCredentials: true,
                    timeout: 5000 // Add timeout to prevent hanging requests
                });

                if (response.data.isAuthenticated) {
                    setCurrUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    console.log(currUser)
                } else {
                    setCurrUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                // Only clear user data if we get a 401 response
                if (error.response && error.response.status === 401) {
                    setCurrUser(null);
                    localStorage.removeItem('user');
                }
                // Don't show error toast for network errors to prevent spam
                if (!error.response || error.response.status !== 401) {
                    console.log('Non-critical auth check error:', error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();

        // Check auth status every 5 seconds instead of 30
        const intervalId = setInterval(checkAuthStatus, 5000);

        return () => clearInterval(intervalId);
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
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        handleClose();
        navigate('/logout');
    };

    const handleLogIn = () => {
        handleClose();
        navigate('/login');
    };

    const handleSignUp = () => {
        handleClose();
        navigate('/Signup');
    };

    const handleProfile = () => {
        if (!currUser) {
            toast.error('Please login to view your profile');
            handleClose();
            navigate('/login');
            return;
        }
        handleClose();
        navigate('/profile');
    };

    const handleMyAccount = () => {
        if (!currUser) {
            toast.error('Please login to view your account');
            handleClose();
            navigate('/login');
            return;
        }
        handleClose();
        navigate('/myaccount');
    };

    const handleSettings = () => {
        if (!currUser) {
            toast.error('Please login to access settings');
            handleClose();
            navigate('/login');
            return;
        }
        handleClose();
        navigate('/settings');
    };

    const addProduct = () => {
        if (!currUser) {
            toast.error('Please login to add a product');
            handleClose();
            navigate('/login');
            return;
        }
        handleClose();
        navigate('/addproduct');
    };

    if (isLoading) {
        return null;
    }

    return (
        <React.Fragment>
            
                {currUser ? (
                    <Box>
                        <MenuItem onClick={handleProfile}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleMyAccount}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={addProduct}>
                            <ListItemIcon sx={{ color: darkMode ? 'white' : 'inherit' }}>
                                <AddIcon fontSize="small" />
                            </ListItemIcon>
                            Add Product
                        </MenuItem>
                        <MenuItem onClick={handleSettings}>
                            <ListItemIcon sx={{ color: darkMode ? 'white' : 'inherit' }}>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon sx={{ color: darkMode ? 'white' : 'inherit' }}>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Box>
                ) : (
                    <Box>
                        <MenuItem onClick={handleLogIn}>
                            <ListItemIcon sx={{ color: darkMode ? 'white' : 'inherit' }}>
                                <LoginIcon fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                        <MenuItem onClick={handleSignUp}>
                            <ListItemIcon sx={{ color: darkMode ? 'white' : 'inherit' }}>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Sign Up
                        </MenuItem>
                    </Box>
                )}
           
        </React.Fragment>
    );
}
