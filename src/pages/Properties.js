import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { properties, mumbaiLocations } from '../data/propertiesData';
import { useUser } from '../context/UserContext';
import './Properties.css';

const Properties = () => {
  const { user, toggleLike, toggleSave, isLiked, isSaved } = useUser();
  const [filters, setFilters] = useState({
    location: 'All',
    category: 'All',
    type: 'All',
    bedrooms: 'All'
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProperties = properties.filter(property => {
    if (filters.location !== 'All' && property.location !== filters.location) return false;
    if (filters.category !== 'All' && property.category !== filters.category) return false;
    if (filters.type !== 'All' && property.type !== filters.type) return false;
    if (filters.bedrooms !== 'All' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    return true;
  });

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="container">
          <h1>All Properties in Mumbai</h1>
          <p>Discover {filteredProperties.length} amazing properties by Vishnu Real Estate</p>
        </div>
      </div>

      <div className="container">
        <div className="properties-content">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <h3>Filter Properties</h3>
            
            <div className="filter-group">
              <label>Location</label>
              <select name="location" value={filters.location} onChange={handleFilterChange}>
                <option value="All">All Locations</option>
                {mumbaiLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Rent">For Rent</option>
                <option value="Sale">For Sale</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Property Type</label>
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="All">All Types</option>
                <option value="Flat">Flat</option>
                <option value="Independent Home">Independent Home</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Bedrooms</label>
              <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>
            </div>

            <button 
              className="reset-btn"
              onClick={() => setFilters({ location: 'All', category: 'All', type: 'All', bedrooms: 'All' })}
            >
              Reset Filters
            </button>
          </aside>

          {/* Properties Grid */}
          <div className="properties-main">
            <div className="properties-count">
              <p>Showing {filteredProperties.length} properties</p>
            </div>

            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <Link to={`/property/${property.id}`} className="property-link">
                    <div className="property-image">
                      <img src={property.images[0]} alt={property.title} />
                      <span className={`property-badge ${property.category.toLowerCase()}`}>
                        {property.category}
                      </span>
                      <span className="property-type-badge">{property.type}</span>
                    </div>
                    <div className="property-info">
                      <h3>{property.title}</h3>
                      <p className="property-location">📍 {property.location}</p>
                      <div className="property-details">
                        <span>🛏️ {property.bedrooms} BHK</span>
                        <span>🚿 {property.bathrooms} Bath</span>
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
                      <p className="property-owner">Owner: {property.owner}</p>
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

            {filteredProperties.length === 0 && (
              <div className="no-properties">
                <h3>No properties found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
