import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      alert(`You are already logged in as ${user.name}! 👤\n\nRedirecting to your profile...`);
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Check if admin login
      if (formData.email === 'vishnusagar@gmail.com') {
        if (formData.password === 'vishnusagar') {
          setTimeout(() => {
            const adminData = {
              name: 'Vishnu Sagar',
              email: formData.email,
              role: 'admin',
              loginDate: new Date().toISOString()
            };
            
            login(adminData);
            
            // Log admin activity
            const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
            activities.unshift({
              id: Date.now(),
              action: 'Admin Login',
              description: 'Administrator logged into the system',
              timestamp: new Date().toISOString(),
              user: 'Admin'
            });
            localStorage.setItem('userActivities', JSON.stringify(activities));
            
            alert(`Welcome Admin! 👑\n\nYou have successfully logged in.\n\nRedirecting to Admin Dashboard...`);
            setIsSubmitting(false);
            setFormData({ email: '', password: '' });
            navigate('/admin');
          }, 1500);
        } else {
          setIsSubmitting(false);
          setErrors({ password: 'Invalid admin password' });
          alert('Invalid admin credentials! ❌\n\nPlease check your password and try again.');
        }
        return;
      }
      
      // Regular user login - check if user exists
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      let existingUser = allUsers.find(u => u.email === formData.email);
      
      if (!existingUser) {
        setIsSubmitting(false);
        setErrors({ email: 'User not found. Please register first.' });
        alert('User not found! ❌\n\nThis email is not registered.\n\nPlease register first to create an account.');
        return;
      }
      
      // Migration: If user doesn't have a password (old user), update their record with the provided password
      if (!existingUser.password) {
        existingUser.password = formData.password;
        const updatedUsers = allUsers.map(u => 
          u.email === existingUser.email ? existingUser : u
        );
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        
        // Log migration
        const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        activities.unshift({
          id: Date.now(),
          action: 'User Migration',
          description: `User ${existingUser.name} password updated`,
          timestamp: new Date().toISOString(),
          user: existingUser.name
        });
        localStorage.setItem('userActivities', JSON.stringify(activities));
      } else {
        // Check password for users with existing passwords
        if (existingUser.password !== formData.password) {
          setIsSubmitting(false);
          setErrors({ password: 'Incorrect password' });
          alert('Incorrect password! ❌\n\nPlease check your password and try again.');
          return;
        }
      }
      
      // Login successful
      setTimeout(() => {
        const userData = {
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          loginDate: new Date().toISOString()
        };
        
        login(userData);
        
        // Log user activity
        const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        activities.unshift({
          id: Date.now(),
          action: 'User Login',
          description: `User ${existingUser.name} logged in`,
          timestamp: new Date().toISOString(),
          user: existingUser.name
        });
        localStorage.setItem('userActivities', JSON.stringify(activities));
        
        alert(`Welcome back, ${existingUser.name}! 🎉\n\nYou have successfully logged in to Vishnu Real Estate.\n\nExplore our premium properties across Mumbai!`);
        setIsSubmitting(false);
        setFormData({ email: '', password: '' });
        navigate('/');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetEmailError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError('Please enter a valid email address');
      return;
    }

    setIsResetting(true);
    
    // Simulate sending email
    setTimeout(() => {
      alert(`Password Reset Email Sent! 📧\n\nWe've sent a password reset link to:\n${resetEmail}\n\nPlease check your email inbox and spam folder.\n\nThe link will expire in 24 hours.`);
      setIsResetting(false);
      setResetEmail('');
      setResetEmailError('');
      setShowForgotPassword(false);
    }, 1500);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetEmailError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <div className="login-overlay">
            <h2>Welcome Back!</h2>
            <p>Find your dream home with Vishnu Real Estate</p>
            <div className="login-features">
              <div className="feature">✓ 200+ Premium Properties</div>
              <div className="feature">✓ 8 Mumbai Locations</div>
              <div className="feature">✓ Trusted Service</div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-header">
            <h1>Login</h1>
            <p>Access your account at Vishnu Real Estate</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <button
  type="button"
  className="forgot-password"
  onClick={handleForgotPasswordClick}
>
  Forgot Password?
</button>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-modal" onClick={closeForgotPasswordModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForgotPasswordModal}>✕</button>
            <h2>Reset Password</h2>
            <p className="modal-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label htmlFor="resetEmail">Email Address</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setResetEmailError('');
                  }}
                  className={resetEmailError ? 'error' : ''}
                  placeholder="Enter your email"
                  autoFocus
                />
                {resetEmailError && <span className="error-message">{resetEmailError}</span>}
              </div>
              <button 
                type="submit" 
                className={`submit-btn ${isResetting ? 'submitting' : ''}`}
                disabled={isResetting}
              >
                {isResetting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
