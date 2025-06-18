import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const contact = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            toast.error('Please login to submit contact');
            return;
        }else{
            try {
                const contactData = {
                    ...formData,
                };

                await axios.post('http://localhost:3000/contact', contactData, {
                    withCredentials: true
                });
                
                toast.success('Contact submitted and email sent successfully!');
                
                navigate('/');
                setFormData({
                    name: '',
                    description: '',
                    phone: '',
                    email: ''
                })
            } catch (err) {
                console.error('Error in contact:', err);
                toast.error('Failed to submit contact. Please try again.');
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <h1 className="text-center mb-4">Contact Us</h1>
                    <div className="row g-4">
                        <div className="col-12 col-md-5">
                            <img src='./public/contact.jpg' alt="contact" className="img-fluid rounded shadow-sm" style={{ height: '100%', objectFit: 'cover' }}/>
                        </div>
                        
                        <div className="col-12 col-md-7">
                            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="form-control" 
                                        value={formData.name}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        type="text" 
                                        id="description" 
                                        rows="4"
                                        className="form-control" 
                                        value={formData.description}
                                        onChange={handleChange} 
                                        required 
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input 
                                        type="text" 
                                        id="phone" 
                                        className="form-control" 
                                        value={formData.phone}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control" 
                                        value={formData.email}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary w-100">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default contact;
