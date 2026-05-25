import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { properties, mumbaiLocations } from '../data/propertiesData';
import { useUser } from '../context/UserContext';
import './Home.css';

const Home = () => {
  // const navigate = useNavigate();
  const { user, toggleLike, toggleSave, isLiked, isSaved } = useUser();
  const featuredProperties = properties.slice(0, 6);
  
  // Slider images
  const sliderImages = [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="home">
      {/* Hero Section with Slider */}
      <section className="hero">
        {/* Image Slider */}
        <div className="hero-slider">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        {/* Slider Controls */}
        <button className="slider-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          ❯
        </button>

        {/* Slider Dots */}
        <div className="slider-dots">
          {sliderImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Home in Mumbai</h1>
          <p className="hero-subtitle">Premium Properties by Vishnu Real Estate</p>
          <div className="hero-buttons">
            <Link to="/properties" className="btn btn-primary">Explore Properties</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>{properties.length}+</h3>
            <p>Properties</p>
          </div>
          <div className="stat-item">
            <h3>8</h3>
            <p>Locations</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section locations-section">
        <div className="container">
          <h2 className="section-title">Explore Mumbai Locations</h2>
          <div className="locations-grid">
            {mumbaiLocations.map((location, index) => (
              <Link 
                to={`/search?location=${location}`} 
                key={index}
                className="location-card"
              >
                <div className="location-icon">📍</div>
                <h3>{location}</h3>
                <p>{properties.filter(p => p.location === location).length} Properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          <div className="properties-grid">
            {featuredProperties.map(property => (
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
                {user && (
                  <div className="property-actions">
                    <button 
                      className={`action-btn like-btn ${isLiked(property.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(property.id);
                      }}
                      title={isLiked(property.id) ? 'Unlike' : 'Like'}
                    >
                      ❤️
                    </button>
                    <button 
                      className={`action-btn save-btn ${isSaved(property.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSave(property.id);
                      }}
                      title={isSaved(property.id) ? 'Unsave' : 'Save'}
                    >
                      🔖
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="view-all-btn">
            <Link to="/properties" className="btn btn-primary">View All Properties</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose Vishnu Real Estate?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Premium Properties</h3>
              <p>Handpicked selection of the best properties in Mumbai</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with transparent dealings</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Trusted Service</h3>
              <p>Years of experience in Mumbai real estate</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Always available to help you find your dream home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Contact Vishnu today and let us help you find the perfect property</p>
          <Link to="/contact" className="btn btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
