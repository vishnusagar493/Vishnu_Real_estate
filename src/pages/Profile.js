import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { properties } from '../data/propertiesData';
import './Profile.css';

const Profile = () => {
  const { user, logout, likedProperties, savedProperties, contactedProperties, bookedVisits, toggleLike, toggleSave } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('liked');

  if (!user) {
    navigate('/login');
    return null;
  }

  const likedProps = properties.filter(p => likedProperties.includes(p.id));
  const savedProps = properties.filter(p => savedProperties.includes(p.id));

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p className="profile-email">📧 {user.email}</p>
              {user.phone && <p className="profile-phone">📞 {user.phone}</p>}
              <p className="profile-member-since">
                Member since {new Date(user.registrationDate || user.loginDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <h3>{likedProperties.length}</h3>
              <p>Liked Properties</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔖</div>
            <div className="stat-info">
              <h3>{savedProperties.length}</h3>
              <p>Saved Properties</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📞</div>
            <div className="stat-info">
              <h3>{contactedProperties.length}</h3>
              <p>Contacted Owners</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{bookedVisits.length}</h3>
              <p>Booked Visits</p>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            ❤️ Liked ({likedProperties.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            🔖 Saved ({savedProperties.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contacted' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacted')}
          >
            📞 Contacted ({contactedProperties.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'booked' ? 'active' : ''}`}
            onClick={() => setActiveTab('booked')}
          >
            📅 Booked Visits ({bookedVisits.length})
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'liked' && (
            <div className="properties-section">
              {likedProps.length > 0 ? (
                <div className="properties-grid">
                  {likedProps.map(property => (
                    <div key={property.id} className="property-card">
                      <Link to={`/property/${property.id}`} className="property-link">
                        <div className="property-image">
                          <img src={property.images[0]} alt={property.title} />
                          <span className={`property-badge ${property.category.toLowerCase()}`}>
                            {property.category}
                          </span>
                        </div>
                        <div className="property-info">
                          <h3>{property.title}</h3>
                          <p className="property-location">📍 {property.location}</p>
                          <div className="property-details">
                            <span>🛏️ {property.bedrooms} BHK</span>
                            <span>📐 {property.area} sq.ft</span>
                          </div>
                          <div className="property-footer">
                            <p className="property-price">
                              ₹{property.price.toLocaleString('en-IN')}
                              {property.category === 'Rent' && '/month'}
                            </p>
                            <div className="property-rating">
                              ⭐ {property.rating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="property-actions">
                        <button 
                          className="action-btn like-btn active"
                          onClick={() => toggleLike(property.id)}
                          title="Unlike"
                        >
                          ❤️
                        </button>
                        <button 
                          className={`action-btn save-btn ${savedProperties.includes(property.id) ? 'active' : ''}`}
                          onClick={() => toggleSave(property.id)}
                          title={savedProperties.includes(property.id) ? 'Unsave' : 'Save'}
                        >
                          🔖
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">💔</div>
                  <h3>No Liked Properties Yet</h3>
                  <p>Start exploring and like properties you love!</p>
                  <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="properties-section">
              {savedProps.length > 0 ? (
                <div className="properties-grid">
                  {savedProps.map(property => (
                    <div key={property.id} className="property-card">
                      <Link to={`/property/${property.id}`} className="property-link">
                        <div className="property-image">
                          <img src={property.images[0]} alt={property.title} />
                          <span className={`property-badge ${property.category.toLowerCase()}`}>
                            {property.category}
                          </span>
                        </div>
                        <div className="property-info">
                          <h3>{property.title}</h3>
                          <p className="property-location">📍 {property.location}</p>
                          <div className="property-details">
                            <span>🛏️ {property.bedrooms} BHK</span>
                            <span>📐 {property.area} sq.ft</span>
                          </div>
                          <div className="property-footer">
                            <p className="property-price">
                              ₹{property.price.toLocaleString('en-IN')}
                              {property.category === 'Rent' && '/month'}
                            </p>
                            <div className="property-rating">
                              ⭐ {property.rating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="property-actions">
                        <button 
                          className={`action-btn like-btn ${likedProperties.includes(property.id) ? 'active' : ''}`}
                          onClick={() => toggleLike(property.id)}
                          title={likedProperties.includes(property.id) ? 'Unlike' : 'Like'}
                        >
                          ❤️
                        </button>
                        <button 
                          className="action-btn save-btn active"
                          onClick={() => toggleSave(property.id)}
                          title="Unsave"
                        >
                          🔖
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3>No Saved Properties Yet</h3>
                  <p>Save properties to view them later!</p>
                  <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacted' && (
            <div className="properties-section">
              {contactedProperties.length > 0 ? (
                <div className="contacted-list">
                  {contactedProperties.map((contact, index) => (
                    <div key={index} className="contacted-card">
                      <div className="contacted-header">
                        <div>
                          <h3>{contact.propertyTitle}</h3>
                          <p className="owner-name">Owner: {contact.ownerName}</p>
                        </div>
                        <Link to={`/property/${contact.propertyId}`} className="view-property-btn">
                          View Property
                        </Link>
                      </div>
                      <div className="contacted-message">
                        <strong>Your Message:</strong>
                        <p>{contact.message}</p>
                      </div>
                      <div className="contacted-date">
                        📅 Contacted on {new Date(contact.date).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📞</div>
                  <h3>No Contacted Properties Yet</h3>
                  <p>Contact property owners to inquire about properties!</p>
                  <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'booked' && (
            <div className="properties-section">
              {bookedVisits.length > 0 ? (
                <div className="booked-list">
                  {bookedVisits.map((booking, index) => (
                    <div key={index} className="booked-card">
                      <div className="booked-header">
                        <div>
                          <h3>{booking.propertyTitle}</h3>
                          <p className="owner-name">Owner: {booking.ownerName}</p>
                        </div>
                        <Link to={`/property/${booking.propertyId}`} className="view-property-btn">
                          View Property
                        </Link>
                      </div>
                      <div className="booking-details">
                        <div className="booking-info">
                          <span className="booking-icon">📅</span>
                          <div>
                            <strong>Visit Date</strong>
                            <p>{new Date(booking.date).toLocaleDateString('en-IN', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric'
                            })}</p>
                          </div>
                        </div>
                        <div className="booking-info">
                          <span className="booking-icon">🕐</span>
                          <div>
                            <strong>Visit Time</strong>
                            <p>{booking.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="booked-date">
                        Booked on {new Date(booking.bookedOn).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📅</div>
                  <h3>No Booked Visits Yet</h3>
                  <p>Schedule property visits to view them in person!</p>
                  <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
