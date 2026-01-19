import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Powered by AI</span>
          </div>

          <h1 className="hero-title">
            Connect. Match.<br />
            Build Your Network.
          </h1>

          <p className="hero-subtitle">
            Connect X is a smart social platform that helps you meet the right people
            for collaboration, opportunities, and growth.
          </p>

          <div className="hero-ctas">
            <Link to="/login" className="btn-primary hero-primary-btn">
              <span>Match X</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-secondary">
              Explore Feed
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">2M+</div>
              <div className="stat-label">Connections</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Match Rate</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="spline-container">
            <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
          </div>
        </div>
      </div>

      <div className="hero-gradient"></div>
    </section>
  );
};
