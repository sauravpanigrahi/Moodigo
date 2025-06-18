import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Address=()=>{
  const [address, setAddress] = useState({
    name: '', 
    email: '',
    number: '',
    address: '',
    pincode: '',
    state: '',
    city: ''
  });
  const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response=await axios.post("https://moodigo-96i1.onrender.com/Address", address, {
          withCredentials: true
        });
        setAddress(response.data);
        toast.success('Address added successfully!');
        navigate("/cartdetails")
      }catch(err){
        console.error('Error adding address', err);
        toast.error(err.response?.data?.error || 'Failed to add address');
      }
    }
    const onchange=(e)=>{
      const { id, value } = e.target;
        setAddress(prevState=>{
          return {
            ...prevState,
            [id]: value
          }
        })
    }
  
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                    <h2>Enter your Address</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Name"
                                onChange={onchange}
                                id="name"
                                value={address.name}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                onChange={onchange}
                                placeholder="Enter your Email"
                                id="email"
                                value={address.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="number"
                                onChange={onchange}
                                placeholder="Phone Number"
                                value={address.number}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Enter Your Address"
                                onChange={onchange}
                                value={address.address}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                placeholder="Enter Your Pincode"
                                onChange={onchange}
                                value={address.pincode}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                placeholder="Enter Your State"
                                onChange={onchange}
                                value={address.state}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Enter Your City"
                                onChange={onchange}
                                value={address.city}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Address;