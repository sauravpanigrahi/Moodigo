import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './config/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get('/check-auth');
      if (response.data.isAuthenticated) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Check auth when tab becomes active
    const onFocus = () => checkAuth();
    window.addEventListener('focus', onFocus);

    // Listen for login/logout events
    const handleLogin = (e) => {
      setUser(e.detail.user);
    };
    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener('loginSuccess', handleLogin);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('loginSuccess', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new CustomEvent('loginSuccess', {
        detail: { user: response.data.user }
      }));
      toast.success(response.data.message || 'Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/logout');
      setUser(null);
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('logout'));
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 