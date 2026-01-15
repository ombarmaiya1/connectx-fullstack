import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Github, Linkedin } from 'lucide-react';
import { possibleConnections } from '../data/mockData';

export const Network = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users] = useState(possibleConnections);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="network-page">
            {/* Search Section */}
            <div className="network-search-section">
                <div className="network-search-wrapper">
                    <Search size={20} className="search-icon-network" />
                    <input
                        type="text"
                        placeholder="Search by name or skills..."
                        className="network-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="network-filter-btn">
                    <SlidersHorizontal size={20} />
                    Filters
                </button>
            </div>

            {/* User Cards Grid */}
            <div className="network-cards-grid">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="network-user-card glass-card">
                        {/* Avatar with Online Status */}
                        <div className="network-avatar-wrapper">
                            <img src={user.avatar} alt={user.name} className="network-avatar" />
                            {user.isOnline && <span className="online-status-dot"></span>}
                        </div>

                        {/* User Info */}
                        <h3 className="network-user-name">{user.name}</h3>
                        <p className="network-user-role">{user.role}</p>
                        <p className="network-user-bio">{user.bio}</p>

                        {/* Location */}
                        <div className="network-location">
                            <MapPin size={14} />
                            <span>{user.location}</span>
                        </div>

                        {/* Skills */}
                        <div className="network-skills">
                            {user.skills.map((skill, index) => (
                                <span key={index} className="network-skill-tag">{skill}</span>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="network-social-icons">
                            <a href={user.github} className="network-social-icon" target="_blank" rel="noopener noreferrer">
                                <Github size={18} />
                            </a>
                            <a href={user.linkedin} className="network-social-icon" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Connect Button */}
                        <button className="network-connect-btn">
                            Connect
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="network-empty-state">
                    <p>No users found matching your search.</p>
                </div>
            )}
        </div>
    );
};
