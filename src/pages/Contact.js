import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
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

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Thank you for contacting Vishnu Real Estate! We will get back to you soon.');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with Vishnu Real Estate</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="about-section">
              <h2>About Vishnu Real Estate</h2>
              <p>
                Welcome to Vishnu Real Estate, your trusted partner in finding the perfect property in Mumbai. 
                With years of experience and a deep understanding of the Mumbai real estate market, we are 
                committed to helping you find your dream home.
              </p>
              <p>
                We specialize in premium properties across 8 prime locations in Mumbai, offering a wide range 
                of flats, independent homes, and luxury villas. Our mission is to provide transparent, reliable, 
                and personalized service to every client.
              </p>
            </div>

            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
                <p>+91 98765 43211</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <p>vishnu@realestate.com</p>
                <p>info@vishnurealestate.com</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>Office</h3>
                <p>Mumbai, Maharashtra</p>
                <p>India - 400001</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🕐</div>
                <h3>Working Hours</h3>
                <p>Mon - Sat: 9AM - 7PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="owner-section">
              <div className="owner-card">
                <div className="owner-image-container">
                  <img 
                    src="/images/vishnu-ceo.jpg"
                    alt="Vishnu - CEO" 
                    className="owner-photo"
                    onClick={openImageModal}
                    style={{ cursor: 'pointer' }}
                    title="Click to view larger"
                  />
                  <div className="image-zoom-hint">🔍 Click to enlarge</div>
                </div>
                <div className="owner-details">
                  <h3>Vishnu</h3>
                  <p className="owner-title">Founder & CEO</p>
                  <p className="owner-description">
                    With over 15 years of experience in Mumbai real estate, Vishnu has helped 
                    thousands of families find their perfect homes. His commitment to excellence 
                    and customer satisfaction has made Vishnu Real Estate a trusted name in Mumbai.
                    As the visionary leader, he personally oversees every property listing to ensure 
                    the highest quality standards for our clients.
                  </p>
                  <div className="owner-credentials">
                    <div className="credential-item">
                      <span className="credential-icon">🏆</span>
                      <span>15+ Years Experience</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-icon">🏠</span>
                      <span>1000+ Happy Clients</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-icon">⭐</span>
                      <span>Top Real Estate Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-container">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
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
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us about your requirements"
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {isImageModalOpen && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-overlay"></div>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>✕</button>
            <img 
              src="/images/vishnu-ceo.jpg" 
              alt="Vishnu - CEO Full Size" 
              className="modal-image"
            />
            <div className="modal-caption">
              <h3>Vishnu</h3>
              <p>Founder & CEO - Vishnu Real Estate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
