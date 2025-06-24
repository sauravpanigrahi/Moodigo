import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('https://moodigo-96i1.onrender.com/check-auth', {
                    withCredentials: true,
                    timeout: 5000,
                });

                if (response.data.isAuthenticated) {
                    setCurrUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } else {
                    setCurrUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                if (error.response && error.response.status === 401) {
                    setCurrUser(null);
                    localStorage.removeItem('user');
                } else if (error.code === 'ECONNABORTED') {
                    console.warn('Auth request timed out');
                } else {
                    console.warn('Non-critical auth check error:', error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
        const intervalId = setInterval(checkAuthStatus, 15000); // 15 seconds polling

        return () => clearInterval(intervalId);
    }, []);

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

    useEffect(() => {
        const handleLoginSuccess = (e) => {
            if (e.detail && e.detail.user) {
                setCurrUser(e.detail.user);
            }
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);
        return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
    }, []);

    useEffect(() => {
        console.log('Updated user:', currUser);
    }, [currUser]);

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
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={currUser ? "Account settings" : "Login/Signup"}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {currUser ? currUser.email?.[0]?.toUpperCase() || 'U' : 'G'}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
                            color: darkMode ? 'white' : 'black',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
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
            </Menu>
        </React.Fragment>
    );
}
