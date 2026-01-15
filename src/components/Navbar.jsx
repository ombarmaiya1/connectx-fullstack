import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MessageCircle, User } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/dashboard');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo Section */}
          <Link to={isAuthPage ? "/dashboard" : "/"} className="nav-logo">
            <span className="logo-icon"></span>
            <span className="logo-text">Connect X</span>
          </Link>

          {/* Authenticated Navbar Content */}
          {isAuthPage ? (
            <>
              {/* Search Bar */}
              <div className="nav-search">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search people, opportunities..."
                  className="search-input"
                />
              </div>

              {/* Center Links */}
              <div className="nav-links-auth">
                <Link to="/dashboard" className="nav-item active">Feed</Link>
                <Link to="/dashboard/network" className="nav-item">Network</Link>
                <Link to="/dashboard/opportunities" className="nav-item">Opportunities</Link>
              </div>

              {/* Right User Actions */}
              <div className="nav-actions">
                <Link to="/dashboard/messages" className="icon-btn-badge">
                  <MessageCircle size={22} />
                  <span className="badge">3</span>
                </Link>
                <Link to="/dashboard/profile" className="icon-btn">
                  <User size={22} />
                </Link>
                <button className="btn-primary btn-small">Match X</button>
              </div>
            </>
          ) : (
            /* Public Navbar Content */
            <>
              <div className="nav-links desktop-only">
                <a href="#features" className="nav-link">Features</a>
                <a href="#feed" className="nav-link">Explore</a>
                <a href="#about" className="nav-link">About</a>
              </div>

              <div className="nav-buttons desktop-only">
                <Link to="/login" className="btn-secondary">Log In</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            {isAuthPage ? (
              <div className="mobile-links">
                <Link to="/dashboard" className="mobile-link">Feed</Link>
                <Link to="/dashboard/network" className="mobile-link">Network</Link>
                <Link to="/dashboard/opportunities" className="mobile-link">Opportunities</Link>
                <div className="mobile-divider"></div>
                <Link to="/dashboard/messages" className="mobile-link" onClick={() => setIsOpen(false)}>Messages (3)</Link>
                <Link to="/dashboard/profile" className="mobile-link" onClick={() => setIsOpen(false)}>Profile</Link>
              </div>
            ) : (
              <div className="mobile-links">
                <a href="#features" className="mobile-link">Features</a>
                <a href="#feed" className="mobile-link">Explore</a>
                <a href="#about" className="mobile-link">About</a>
                <div className="mobile-buttons">
                  <Link to="/login" className="btn-secondary full-width">Log In</Link>
                  <Link to="/signup" className="btn-primary full-width">Sign Up</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
