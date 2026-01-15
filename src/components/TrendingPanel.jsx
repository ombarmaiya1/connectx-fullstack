import React from 'react';
import { TrendingUp } from 'lucide-react';
import { trendingTopics } from '../data/mockData';

export const TrendingPanel = () => {
    return (
        <div className="trending-panel glass-card">
            <div className="trending-header">
                <TrendingUp size={20} className="trending-icon" />
                <h3 className="trending-title">Trending Now</h3>
            </div>
            <div className="trending-list">
                {trendingTopics.map((topic) => (
                    <div key={topic.id} className="trending-item">
                        <div className="trending-label">#{topic.label}</div>
                        <div className="trending-count">{topic.posts.toLocaleString()} posts</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
