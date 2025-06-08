import React, { useEffect, useState } from 'react';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileSection = () => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/check-auth', {
        withCredentials: true,
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
      setCurrUser(null);
      localStorage.removeItem('user');
      toast.error('Authentication failed. Please log in again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // Also check when tab becomes active (optional but helpful)
    const onFocus = () => checkAuthStatus();
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    // Sync across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            setCurrUser(JSON.parse(e.newValue));
          } catch (err) {
            console.error('Invalid user data in localStorage');
          }
        } else {
          setCurrUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!currUser) {
    return <div className="not-authenticated">Please log in to view your profile.</div>;
  }

  return (
    <div className="user-profile-box">
      <div className="avatar-box">
        <Avatar sx={{ bgcolor: '#1976d2', width: 80, height: 80 }}>
          {currUser.Firstname?.[0]?.toUpperCase() || 'U'}
        </Avatar>
        <h2>
          {currUser.Firstname && currUser.Lastname
            ? `${currUser.Firstname} ${currUser.Lastname}`
            : currUser.email.split('@')[0]}
        </h2>
        <p className="user-role">Registered User</p>
      </div>

      <div className="user-info">
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{currUser.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone Number:</span>
          <span className="value">{currUser.phonenumber}</span>
        </div>
        <div className="info-row">
          <span className="label">Account Created:</span>
          <span className="value">
            {new Date(currUser.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
