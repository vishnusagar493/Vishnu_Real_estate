import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Vishnu Real Estate</h3>
            <p>Your trusted partner for premium properties in Mumbai. We help you find your dream home.</p>
            <div className="social-icons">
              <a href="#" className="social-icon"></a>
              <a href="#" className="social-icon"></a>
              <a href="#" className="social-icon"></a>
              <a href="#" className="social-icon"></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Mumbai Locations</h4>
            <ul>
              <li><Link to="/search?location=Sion">Sion</Link></li>
              <li><Link to="/search?location=Matunga">Matunga</Link></li>
              <li><Link to="/search?location=Ghatkopar">Ghatkopar</Link></li>
              <li><Link to="/search?location=Dharavi">Dharavi</Link></li>
              <li><Link to="/search?location=GTB Nagar">GTB Nagar</Link></li>
              <li><Link to="/search?location=King Circle">King Circle</Link></li>
              <li><Link to="/search?location=Kurla">Kurla</Link></li>
              <li><Link to="/search?location=Andheri">Andheri</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>+91 98765 43210</li>
              <li>vishnu@realestate.com</li>
              <li>Mumbai, Maharashtra</li>
              <li>Mon - Sat: 9AM - 7PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Vishnu Real Estate. All rights reserved.</p>
          <p>Owner: Vishnu | Mumbai Properties</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
