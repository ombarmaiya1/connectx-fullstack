import React from 'react';
import { Heart, MessageSquare, UserPlus } from 'lucide-react';
import { feedPosts } from '../data/mockData';

export const SocialFeed = () => {
  return (
    <section id="feed" className="feed-section">
      <div className="section-header">
        <h2 className="section-title">Explore the Feed</h2>
        <p className="section-subtitle">
          See what professionals and students are sharing
        </p>
      </div>
      
      <div className="feed-grid">
        {feedPosts.map((post) => (
          <div key={post.id} className="feed-card glass-card">
            <div className="feed-card-header">
              <img 
                src={post.image} 
                alt={post.name}
                className="feed-avatar"
              />
              <div className="feed-user-info">
                <h4 className="feed-user-name">{post.name}</h4>
                <p className="feed-user-role">{post.role}</p>
              </div>
              <span className="feed-time">{post.time}</span>
            </div>
            
            <p className="feed-post-content">{post.post}</p>
            
            <div className="feed-card-actions">
              <button className="feed-action-btn">
                <Heart size={18} />
                <span>{post.likes}</span>
              </button>
              <button className="feed-action-btn">
                <MessageSquare size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="feed-connect-btn">
                <UserPlus size={18} />
                <span>Connect</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
