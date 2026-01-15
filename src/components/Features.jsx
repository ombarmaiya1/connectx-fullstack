import React from 'react';
import { Sparkles, MessageCircle, Newspaper, Users } from 'lucide-react';
import { features } from '../data/mockData';

const iconMap = {
  Sparkles: Sparkles,
  MessageCircle: MessageCircle,
  Newspaper: Newspaper,
  Users: Users
};

export const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">
          Everything you need to build meaningful professional connections
        </p>
      </div>
      
      <div className="features-grid">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <div key={feature.id} className="feature-card glass-card">
              <div className="feature-icon">
                <Icon size={28} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
