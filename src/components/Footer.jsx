/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="var(--brand-primary)" strokeWidth="2" />
              <path d="M12 16L14.5 18.5L20 13" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="footer-logo-text">Connect X</span>
          </div>
          <p className="footer-tagline">
            Building the future of professional networking
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-column-title">Product</h4>
            <a href="#features" className="footer-link">Features</a>
            <a href="#feed" className="footer-link">Explore Feed</a>
            <a href="#" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">Mobile App</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Contact</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Cookie Policy</a>
            <a href="#" className="footer-link">GDPR</a>
          </div>
        </div>

        <div className="footer-social">
          <h4 className="footer-column-title">Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Connect X. All rights reserved.</p>
      </div>
    </footer>
  );
};
