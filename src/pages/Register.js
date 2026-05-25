import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, user } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      alert(`You are already registered and logged in as ${user.name}! 👤\n\nRedirecting to your profile...`);
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Check if user already exists
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const existingUser = allUsers.find(u => u.email === formData.email);
      
      if (existingUser) {
        setIsSubmitting(false);
        setErrors({ email: 'This email is already registered' });
        alert('Email already registered! ❌\n\nThis email is already in use.\n\nPlease login or use a different email.');
        return;
      }
      
      setTimeout(() => {
        const userData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password, // Store password for authentication
          registeredAt: new Date().toISOString()
        };
        
        // Save to allUsers for admin tracking
        allUsers.push(userData);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        
        // Log activity
        const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        activities.unshift({
          id: Date.now(),
          action: 'New Registration',
          description: `New user registered: ${formData.fullName} (${formData.email})`,
          timestamp: new Date().toISOString(),
          user: formData.fullName
        });
        localStorage.setItem('userActivities', JSON.stringify(activities));
        
        // Register user (login automatically)
        const loginData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          registeredAt: new Date().toISOString()
        };
        register(loginData);
        
        alert(`Welcome to Vishnu Real Estate, ${formData.fullName}! 🎉\n\nYour account has been created successfully.\n\nStart exploring 200+ premium properties across 8 Mumbai locations!`);
        setIsSubmitting(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-image">
          <div className="register-overlay">
            <h2>Join Vishnu Real Estate</h2>
            <p>Start your journey to finding your dream home</p>
            <div className="register-benefits">
              <div className="benefit">🏠 Access to 200+ Properties</div>
              <div className="benefit">📍 8 Prime Mumbai Locations</div>
              <div className="benefit">💰 Best Deals & Offers</div>
              <div className="benefit">🤝 Trusted Service</div>
            </div>
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Register with Vishnu Real Estate</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Create a password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
