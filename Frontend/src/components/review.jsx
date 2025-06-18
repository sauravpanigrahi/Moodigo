import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useDarkMode } from '../context/DarkModeContext';

export default function Review() {
  const { darkMode } = useDarkMode();
  const [review, setReview] = useState({
    rating: 0,
    comment: ''
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const productId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchReviews();
  }, [productId]);

  const checkAuth = async () => {
    try {
      const response = await axios.get('https://moodigo-96i1.onrender.com/check-auth', {
        withCredentials: true
      });
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://moodigo-96i1.onrender.com/review/${productId}`);
      setReviews(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('Product not found');
      } else {
        toast.error('Failed to load reviews');
      }
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }

    if (!review.rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!review.comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      const reviewData = {
        ...review,
      };
      await axios.post(`https://moodigo-96i1.onrender.com/review/${productId}`, reviewData, {
        withCredentials: true
      });
      toast.success('Review submitted successfully');
      setReview({
        rating: 0,
        comment: ''
      });
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to submit a review');
        navigate('/login');
      } else if (error.response?.status === 404) {
        toast.error('Product not found');
      } else {
        const errorMessage = error.response?.data?.error || 'Review submission failed';
        toast.error(errorMessage);
      }
      console.error('Review submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setReview(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    
    <div className='review  offset-1 ps-5 mb-3' style={{ width: '75%' }}>
          {/* Existing Reviews */}
      <div className="existing-reviews">
        <h4 className="mb-3" style={{color: darkMode ? 'white' : 'black'}}>Customer Reviews</h4>
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item mb-3 p-3" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa' }}>
              <div className="d-flex align-items-center mb-2" >
                <Rating value={review.rating} readOnly size="small" />
                <span className="ms-2 text-muted" style={{color: darkMode ? 'white' : 'black'}}>
                  {review.author ? `${review.author.Firstname} ${review.author.Lastname}` : 'Anonymous'} • {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mb-0">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      <h3 className="mb-2" style={{color: darkMode ? 'white' : 'black'}}>Reviews</h3>
      
      {/* Review Form */}
          <div className="review-form mb-4 p-4" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: darkMode ? '#1a1a1a' : '#f8f9fa' }}>
            <h5 className="mb-2" style={{color: darkMode ? 'white' : 'black'}}>Your Rating</h5>
              <Rating
          name="simple-controlled"
          value={review.rating}
          size="large"
          onChange={(event, newValue) => {
            setReview((prev) => ({
              ...prev,
              rating: newValue,
            }));
          }}
          sx={{
            color: darkMode ? 'white' : 'black', // star color in dark/light mode
            '& .MuiRating-icon': {
              color: darkMode ? 'white' : 'black', // star color in dark/light mode
            },
          }}
        />


        <div className='comment mt-3'>
          <textarea 
            placeholder='Enter your comment' 
            onChange={handleChange} 
            id='comment' 
            value={review.comment} 
            className='form-control' 
            rows={4}
          ></textarea>
        </div>
        <button 
          className='btn btn-primary mt-3' 
          onClick={handleSubmit}
          disabled={submitting || !isAuthenticated}
        >
          {!isAuthenticated ? 'Login to Review' : submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>

    
    </div>
  );
}
