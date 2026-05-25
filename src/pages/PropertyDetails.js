import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../data/propertiesData';
import { useUser } from '../context/UserContext';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id);
  const { user, toggleLike, toggleSave, isLiked, isSaved, addContactedProperty, addBookedVisit } = useUser();
  const [currentImage, setCurrentImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', time: '' });
  const [phoneError, setPhoneError] = useState('');

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <Link to="/properties" className="btn btn-primary">Back to Properties</Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleContactClick = () => {
    if (!user) {
      alert('Please login to contact the property owner! 🔐\n\nYou need to be logged in to send messages to property owners.');
      navigate('/login');
      return;
    }
    setShowContactForm(!showContactForm);
    setShowBookingForm(false);
  };

  const handleBookingClick = () => {
    if (!user) {
      alert('Please login to book a property visit! 🔐\n\nYou need to be logged in to schedule property visits.');
      navigate('/login');
      return;
    }
    setShowBookingForm(!showBookingForm);
    setShowContactForm(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      alert('Please fill all fields!');
      return;
    }
    if (!validatePhone(contactForm.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number (starting with 6-9)');
      return;
    }
    
    // Add to contacted properties
    addContactedProperty(property.id, property.title, property.owner, contactForm.message);
    
    alert(`Thank you ${contactForm.name}! 📞\n\nYour message has been sent to ${property.owner}.\nThey will contact you at ${contactForm.phone} soon!\n\nProperty: ${property.title}`);
    setContactForm({ name: '', phone: '', message: '' });
    setPhoneError('');
    setShowContactForm(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date || !bookingForm.time) {
      alert('Please fill all fields!');
      return;
    }
    if (!validatePhone(bookingForm.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number (starting with 6-9)');
      return;
    }
    
    // Add to booked visits
    addBookedVisit(property.id, property.title, property.owner, bookingForm.date, bookingForm.time);
    
    alert(`Visit Booked Successfully! 📅\n\nProperty: ${property.title}\nName: ${bookingForm.name}\nDate: ${bookingForm.date}\nTime: ${bookingForm.time}\n\nOwner ${property.owner} will confirm your visit at ${bookingForm.phone}`);
    setBookingForm({ name: '', phone: '', date: '', time: '' });
    setPhoneError('');
    setShowBookingForm(false);
  };

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    if (e.target.name === 'phone') {
      setPhoneError('');
    }
  };

  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
    if (e.target.name === 'phone') {
      setPhoneError('');
    }
  };

  return (
    <div className="property-details-page">
      <div className="container">
        <Link to="/properties" className="back-link">← Back to Properties</Link>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={property.images[currentImage]} alt={property.title} />
            <button className="nav-btn prev" onClick={prevImage}>‹</button>
            <button className="nav-btn next" onClick={nextImage}>›</button>
            <span className={`property-badge ${property.category.toLowerCase()}`}>
              {property.category}
            </span>
          </div>
          <div className="thumbnail-grid">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`View ${index + 1}`}
                className={currentImage === index ? 'active' : ''}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="property-details-content">
          <div className="property-main-info">
            <div className="property-header">
              <div>
                <h1>{property.title}</h1>
                <p className="location">📍 {property.location}, Mumbai</p>
              </div>
              <div className="header-actions">
                <div className="price-section">
                  <p className="price">₹{property.price.toLocaleString('en-IN')}</p>
                  <p className="price-label">{property.category === 'Rent' ? 'per month' : 'Total Price'}</p>
                </div>
                {user && (
                  <div className="detail-actions">
                    <button 
                      className={`detail-action-btn like-btn ${isLiked(property.id) ? 'active' : ''}`}
                      onClick={() => toggleLike(property.id)}
                      title={isLiked(property.id) ? 'Unlike' : 'Like'}
                    >
                      ❤️ {isLiked(property.id) ? 'Liked' : 'Like'}
                    </button>
                    <button 
                      className={`detail-action-btn save-btn ${isSaved(property.id) ? 'active' : ''}`}
                      onClick={() => toggleSave(property.id)}
                      title={isSaved(property.id) ? 'Unsave' : 'Save'}
                    >
                      🔖 {isSaved(property.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="property-stats">
              <div className="stat">
                <span className="stat-icon">🛏️</span>
                <div>
                  <p className="stat-value">{property.bedrooms}</p>
                  <p className="stat-label">Bedrooms</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">🚿</span>
                <div>
                  <p className="stat-value">{property.bathrooms}</p>
                  <p className="stat-label">Bathrooms</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">📐</span>
                <div>
                  <p className="stat-value">{property.area}</p>
                  <p className="stat-label">sq.ft</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">⭐</span>
                <div>
                  <p className="stat-value">{property.rating.toFixed(1)}</p>
                  <p className="stat-label">Rating</p>
                </div>
              </div>
            </div>

            <div className="property-description">
              <h2>About This Property</h2>
              <p>{property.description}</p>
              <div className="property-tags">
                <span className="tag">{property.type}</span>
                <span className="tag">{property.category}</span>
                <span className="tag">{property.bedrooms} BHK</span>
                <span className="tag">{property.location}</span>
              </div>
            </div>

            <div className="why-recommend">
              <h2>Why We Recommend This Property</h2>
              <ul>
                <li>✓ Prime location in {property.location} with excellent connectivity</li>
                <li>✓ Well-maintained property with modern amenities</li>
                <li>✓ Close to schools, hospitals, and shopping centers</li>
                <li>✓ Safe and secure neighborhood with 24/7 security</li>
                <li>✓ Great investment opportunity with high appreciation potential</li>
                <li>✓ Verified property with clear documentation</li>
              </ul>
            </div>

            <div className="location-highlights">
              <h2>Location Highlights - {property.location}</h2>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <span>🚇</span>
                  <p>Near Railway Station</p>
                </div>
                <div className="highlight-item">
                  <span>🏫</span>
                  <p>Top Schools Nearby</p>
                </div>
                <div className="highlight-item">
                  <span>🏥</span>
                  <p>Hospitals in Vicinity</p>
                </div>
                <div className="highlight-item">
                  <span>🛒</span>
                  <p>Shopping Centers</p>
                </div>
                <div className="highlight-item">
                  <span>🍽️</span>
                  <p>Restaurants & Cafes</p>
                </div>
                <div className="highlight-item">
                  <span>🏞️</span>
                  <p>Parks & Recreation</p>
                </div>
              </div>
            </div>

            <div className="reviews-section">
              <h2>Customer Reviews ({property.reviews.length})</h2>
              <div className="reviews-grid">
                {property.reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                      <div>
                        <h4>{review.name}</h4>
                        <div className="review-rating">
                          {'⭐'.repeat(Math.floor(review.rating))}
                        </div>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="property-sidebar">
            <div className="contact-card">
              <h3>Contact Owner</h3>
              <div className="owner-info">
                <div className="owner-avatar">{property.owner.charAt(0)}</div>
                <div>
                  <h4>{property.owner}</h4>
                  <p>Property Owner</p>
                </div>
              </div>
              <button 
                className={`btn btn-primary ${!user ? 'login-required' : ''}`}
                onClick={handleContactClick}
                title={!user ? 'Login required to contact owner' : 'Contact the property owner'}
              >
                📞 Contact Owner {!user && '🔒'}
              </button>
              <button 
                className={`btn btn-secondary ${!user ? 'login-required' : ''}`}
                onClick={handleBookingClick}
                title={!user ? 'Login required to book visit' : 'Schedule a property visit'}
              >
                📅 Book Visit {!user && '🔒'}
              </button>

              {user && showContactForm && (
                <form className="quick-contact-form" onSubmit={handleContactSubmit}>
                  <h4>Send Message to Owner</h4>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="10-digit Mobile Number" 
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    maxLength="10"
                    pattern="[6-9][0-9]{9}"
                    title="Enter valid 10-digit mobile number starting with 6-9"
                    required
                  />
                  {phoneError && <div className="error-message">{phoneError}</div>}
                  <textarea 
                    name="message"
                    placeholder="Your message to the owner..."
                    value={contactForm.message}
                    onChange={handleContactChange}
                    rows="4"
                    required
                  ></textarea>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Send Message</button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowContactForm(false);
                        setPhoneError('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {user && showBookingForm && (
                <form className="quick-contact-form booking-form" onSubmit={handleBookingSubmit}>
                  <h4>Schedule Property Visit</h4>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    value={bookingForm.name}
                    onChange={handleBookingChange}
                    required
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="10-digit Mobile Number" 
                    value={bookingForm.phone}
                    onChange={handleBookingChange}
                    maxLength="10"
                    pattern="[6-9][0-9]{9}"
                    title="Enter valid 10-digit mobile number starting with 6-9"
                    required
                  />
                  {phoneError && <div className="error-message">{phoneError}</div>}
                  <input 
                    type="date" 
                    name="date"
                    placeholder="Visit Date" 
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <select 
                    name="time"
                    value={bookingForm.time}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Book Visit</button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowBookingForm(false);
                        setPhoneError('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="property-features">
              <h3>Property Features</h3>
              <ul>
                <li>✓ Modular Kitchen</li>
                <li>✓ Parking Available</li>
                <li>✓ 24/7 Security</li>
                <li>✓ Power Backup</li>
                <li>✓ Lift Available</li>
                <li>✓ Water Supply</li>
                <li>✓ Gym Facility</li>
                <li>✓ Children's Play Area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
