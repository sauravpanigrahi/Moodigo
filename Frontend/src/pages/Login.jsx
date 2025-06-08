import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast function

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
     // This should be inside the function
    
    try {
        const response = await axios.post('http://localhost:3000/login', {
            email: email,
            password: password,
        }, { withCredentials: true });

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Dispatch login success event with user data
        window.dispatchEvent(new CustomEvent('loginSuccess', {
            detail: { user: response.data.user }
        }));
        
        toast.success(response.data.message || 'Login successful!');
        navigate("/");
    } catch (err) {
        console.error('Login failed', err);
        if (err.response && err.response.data && err.response.data.error) {
            toast.error(err.response.data.error || 'Login failed. Try again.');
        } else {
            toast.error('Login failed. Try again.');
        }
    }
};


  

  return (
    <div
      className="container"
      style={{
        maxWidth: '400px',
        marginTop: '100px',
        border: '2px solid #007bff', /* Border color */
        padding: '20px', /* Space inside the element */
        borderRadius: '8px', /* Rounded corners */
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Border shadow */
      }}
    >
      <h2 className="text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control mt-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control mt-2"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">
          Log In
        </button>
        
      </form>
      <div className="mt-3 text-center">
        <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
      </div>
      <div className="mt-3 text-center">
        <p>
          Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
