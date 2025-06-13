import React from 'react';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../context/AuthContext';

const ProfileSection = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="not-authenticated">Please log in to view your profile.</div>;
  }

  return (
    <div className="user-profile-box">
      <div className="avatar-box">
        <Avatar sx={{ bgcolor: '#1976d2', width: 80, height: 80 }}>
          {user.Firstname?.[0]?.toUpperCase() || 'U'}
        </Avatar>
        <h2>
          {user.Firstname && user.Lastname
            ? `${user.Firstname} ${user.Lastname}`
            : user.email.split('@')[0]}
        </h2>
        <p className="user-role">Registered User</p>
      </div>

      <div className="user-info">
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone Number:</span>
          <span className="value">{user.phonenumber}</span>
        </div>
        <div className="info-row">
          <span className="label">Account Created:</span>
          <span className="value">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
