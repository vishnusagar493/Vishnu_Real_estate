import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Vishnu Real Estate</span>
          </Link>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={location.pathname === '/properties' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Properties
            </Link>
            <Link 
              to="/search" 
              className={location.pathname === '/search' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Search
            </Link>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="profile-dropdown">
                <button className="profile-btn" onClick={toggleProfileDropdown}>
                  <span className="profile-icon">{user.email === 'vishnusagar@gmail.com' ? '👑' : '👤'}</span>
                  <span className="profile-name">{user.email === 'vishnusagar@gmail.com' ? 'Admin' : user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                {isProfileDropdownOpen && (
                  <div className="dropdown-menu">
                    {user.email === 'vishnusagar@gmail.com' ? (
                      <Link to="/admin" onClick={() => { setIsProfileDropdownOpen(false); closeMobileMenu(); }}>
                        <span className="menu-icon">👑</span> Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/profile" onClick={() => { setIsProfileDropdownOpen(false); closeMobileMenu(); }}>
                          <span className="menu-icon">👤</span> My Profile
                        </Link>
                        <Link to="/profile" onClick={() => { setIsProfileDropdownOpen(false); closeMobileMenu(); }}>
                          <span className="menu-icon">❤️</span> Liked Properties
                        </Link>
                        <Link to="/profile" onClick={() => { setIsProfileDropdownOpen(false); closeMobileMenu(); }}>
                          <span className="menu-icon">🔖</span> Saved Properties
                        </Link>
                      </>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                      <span className="menu-icon">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`login-btn ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </div>

          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
