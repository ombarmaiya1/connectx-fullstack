import React from 'react';
import { UserPlus } from 'lucide-react';
import { suggestedUsers } from '../data/mockData';

export const SuggestedPanel = () => {
    return (
        <div className="suggested-panel glass-card">
            <div className="suggested-header">
                <h3 className="suggested-title">Suggested</h3>
            </div>
            <div className="suggested-list">
                {suggestedUsers.map((user) => (
                    <div key={user.id} className="suggested-item">
                        <img src={user.avatar} alt={user.name} className="suggested-avatar" />
                        <div className="suggested-info">
                            <div className="suggested-name">{user.name}</div>
                            <div className="suggested-role">{user.role}</div>
                        </div>
                        <button className="suggested-follow-btn">
                            <UserPlus size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
