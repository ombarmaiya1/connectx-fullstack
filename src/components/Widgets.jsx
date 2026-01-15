import React from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { trendingTopics, suggestedUsers } from '../data/mockData';

export const Widgets = () => {
    return (
        <aside className="dashboard-widgets">
            {/* Trending Topics Widget */}
            <div className="widget-card glass-card">
                <div className="widget-header">
                    <TrendingUp size={18} className="widget-icon" />
                    <h3 className="widget-title">Trending Now</h3>
                </div>
                <div className="widget-content">
                    {trendingTopics.map((topic) => (
                        <div key={topic.id} className="widget-trending-item">
                            <div className="widget-trending-label">#{topic.label}</div>
                            <div className="widget-trending-count">{topic.posts.toLocaleString()} posts</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who to follow Widget */}
            <div className="widget-card glass-card">
                <div className="widget-header">
                    <h3 className="widget-title">Who to follow</h3>
                </div>
                <div className="widget-content">
                    {suggestedUsers.map((user) => (
                        <div key={user.id} className="follow-suggestion">
                            <img src={user.avatar} alt={user.name} className="suggestion-avatar" />
                            <div className="suggestion-info">
                                <h4 className="suggestion-name">{user.name}</h4>
                                <p className="suggestion-role">{user.role}</p>
                            </div>
                            <button className="btn-icon-small">
                                <Plus size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <button className="widget-more-btn">Show more</button>
            </div>

            <div className="dashboard-footer">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Advertising</a>
                <p>Connect X © 2026</p>
            </div>
        </aside>
    );
};
