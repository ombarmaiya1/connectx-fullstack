import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section id="about" className="cta-section">
      <div className="cta-content glass-card">
        <h2 className="cta-title">
          Find the right people.<br />
          Start building today.
        </h2>
        <p className="cta-subtitle">
          Join thousands of professionals and students already making meaningful connections
        </p>
        <Link to="/login" className="btn-primary cta-button">
          <span>Match X</span>
          <ArrowRight size={22} />
        </Link>
      </div>
      <div className="cta-gradient"></div>
    </section>
  );
};
