import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleLogOut = async () => {
            try {
                const response = await axios.get('https://moodigo-1jm5.onrender.com/logout', { 
                    withCredentials: true 
                });
                
                // Clear the user from localStorage
                localStorage.removeItem('user');
                
                // Trigger a custom event to notify other components about the logout
                window.dispatchEvent(new Event('userLogout'));
                
                toast.success(response.data.message || 'Logout successful!');
                navigate("/ ");
            } catch (err) {
                // console.error('Logout error:', err);
                
                // Still clear localStorage even if server logout fails
                localStorage.removeItem('user');
                
                // Trigger logout event even if server request fails
                window.dispatchEvent(new Event('userLogout'));
                
                if (err.response && err.response.data && err.response.data.error) {
                    toast.error(err.response.data.error || 'Logout failed. Try again.');
                } else {
                    toast.error('Logout failed. Try again.');
                }
                
                // Redirect to Home page anyway
                navigate("/ ");
            }
        };
        
        handleLogOut();
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <p>Logging out...</p>
        </div>
    );
};
 
export default Logout;