import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { properties, mumbaiLocations, searchProperties } from '../data/propertiesData';
import { useUser } from '../context/UserContext';
import './SearchByLocation.css';

const SearchByLocation = () => {
  const { user, toggleLike, toggleSave, isLiked, isSaved } = useUser();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || 'All',
    category: 'All',
    type: 'All',
    bedrooms: 'All',
    minPrice: '',
    maxPrice: ''
  });

  const [searchResults, setSearchResults] = useState(properties);

  useEffect(() => {
    const results = searchProperties(filters);
    setSearchResults(results);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      location: 'All',
      category: 'All',
      type: 'All',
      bedrooms: 'All',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1>Search Properties in Mumbai</h1>
          <p>Find your perfect home with advanced search filters</p>
        </div>
      </div>

      <div className="container">
        <div className="search-content">
          {/* Search Filters */}
          <div className="search-filters">
            <h2>Search Filters</h2>
            
            <div className="filter-section">
              <h3>Location</h3>
              <select name="location" value={filters.location} onChange={handleFilterChange}>
                <option value="All">All Mumbai</option>
                {mumbaiLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="filter-section">
              <h3>Rent or Sale</h3>
              <div className="radio-group">
                <label className={filters.category === 'All' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="category"
                    value="All"
                    checked={filters.category === 'All'}
                    onChange={handleFilterChange}
                  />
                  All
                </label>
                <label className={filters.category === 'Rent' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="category"
                    value="Rent"
                    checked={filters.category === 'Rent'}
                    onChange={handleFilterChange}
                  />
                  Rent
                </label>
                <label className={filters.category === 'Sale' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="category"
                    value="Sale"
                    checked={filters.category === 'Sale'}
                    onChange={handleFilterChange}
                  />
                  Sale
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3>Property Type</h3>
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="All">All Types</option>
                <option value="Flat">Flat</option>
                <option value="Independent Home">Independent Home</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div className="filter-section">
              <h3>Bedrooms</h3>
              <div className="bedroom-buttons">
                {['All', '1', '2', '3', '4', '5'].map(bhk => (
                  <button
                    key={bhk}
                    className={filters.bedrooms === bhk ? 'active' : ''}
                    onClick={() => setFilters({ ...filters, bedrooms: bhk })}
                  >
                    {bhk === 'All' ? 'All' : `${bhk} BHK`}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>

            <button className="reset-btn" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>

          {/* Search Results */}
          <div className="search-results">
            <div className="results-header">
              <h2>Search Results</h2>
              <p>{searchResults.length} properties found</p>
            </div>

            <div className="results-grid">
              {searchResults.map(property => (
                <div key={property.id} className="result-card">
                  <Link to={`/property/${property.id}`} className="result-link">
                    <div className="result-image">
                      <img src={property.images[0]} alt={property.title} />
                      <span className={`badge ${property.category.toLowerCase()}`}>
                        {property.category}
                      </span>
                    </div>
                    <div className="result-info">
                      <h3>{property.title}</h3>
                      <p className="result-location">📍 {property.location}</p>
                      <div className="result-details">
                        <span>🛏️ {property.bedrooms} BHK</span>
                        <span>📐 {property.area} sq.ft</span>
                        <span className="result-type">{property.type}</span>
                      </div>
                      <div className="result-footer">
                        <p className="result-price">
                          ₹{property.price.toLocaleString('en-IN')}
                          {property.category === 'Rent' && '/mo'}
                        </p>
                        <div className="result-rating">⭐ {property.rating.toFixed(1)}</div>
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

            {searchResults.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No properties found</h3>
                <p>Try adjusting your search filters</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByLocation;
