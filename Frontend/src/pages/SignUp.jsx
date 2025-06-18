import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast function
import { useDarkMode } from '../context/DarkModeContext';
const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState(''); 
  const [message, setMessage] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
   try{
    const  response=await axios.post('https://moodigo-96i1.onrender.com/signup',
       {Firstname,Lastname, email,phonenumber, password},{

      withCredentials: true, // Include credentials for CORS requests
   })
   toast.success(response.data.message || 'Signup successful!');
   navigate("/products")
   }catch(err){
    console.error('Error signing up', err);
    toast.error(err.response.data.error || 'Signup failed. Try again.');
    setMessage('Signup failed. Try again.');
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
        backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa',
        // color: darkMode ? 'white' : 'black',
       
      }}
    >
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="Firstname">Firstname</label>
          <input
            type="text"
            id="Firstname"
            className="form-control mt-2"
            placeholder="Enter Firstname"
            
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="Lastname">Lastname</label>
          <input
            type="text"
            id="Lastname"
            className="form-control mt-2"
            placeholder="Enter Lastname"
            value={Lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
         <div className="form-group mt-2">
          <label htmlFor="phonenumber">Phone number</label>
          <input
            type="text"
            id="phonenumber"
            className="form-control mt-2"
            placeholder="Enter Phonenumber"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
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
          Sign Up
        </button>
        {message && <p className="text-danger mt-3">{message}</p>} 
      </form>
     
    </div>
    
  );
};

export default SignUpPage;
