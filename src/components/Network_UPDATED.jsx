import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Github, Linkedin, MessageCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const Network = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
        hasNext: false,
        hasPrev: false
    });

    // Get auth token from localStorage
    const getAuthToken = () => {
        return localStorage.getItem('access_token');
    };

    // Fetch users from API
    const fetchUsers = async (page = 1, search = '') => {
        setLoading(true);
        setError(null);

        try {
            const token = getAuthToken();
            const endpoint = search
                ? `${API_BASE}/profile/network/search/`
                : `${API_BASE}/profile/network/`;

            const params = search
                ? { query: search, page, limit: 20 }
                : { page, limit: 20 };

            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params
            });

            if (response.data.success) {
                setUsers(response.data.data);
                if (response.data.pagination) {
                    setPagination(response.data.pagination);
                }
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchUsers(1, query);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    // Handle connect button
    const handleConnect = async (userId) => {
        try {
            const token = getAuthToken();
            await axios.post(
                `${API_BASE}/connect/request`,
                { receiver_id: userId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Refresh users to update connection status
            fetchUsers(pagination.page, searchQuery);
        } catch (err) {
            console.error('Error sending connection request:', err);
            alert('Failed to send connection request. Please try again.');
        }
    };

    // Get button text based on connection status
    const getConnectButtonText = (status) => {
        switch (status) {
            case 'connected':
                return 'Connected';
            case 'pending':
                return 'Pending';
            default:
                return 'Connect';
        }
    };

    // Get button disabled state
    const isConnectButtonDisabled = (status) => {
        return status === 'connected' || status === 'pending';
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
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
                        onChange={handleSearch}
                    />
                </div>
                <button className="network-filter-btn">
                    <SlidersHorizontal size={20} />
                    Filters
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="network-loading">
                    <p>Loading users...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="network-error">
                    <p>{error}</p>
                    <button onClick={() => fetchUsers()}>Retry</button>
                </div>
            )}

            {/* User Cards Grid */}
            {!loading && !error && (
                <div className="network-cards-grid">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="network-user-card glass-card">
                            {/* Avatar with Online Status */}
                            <div className="network-avatar-wrapper">
                                <img
                                    src={user.profileImage || user.avatar || 'https://i.pravatar.cc/150'}
                                    alt={user.name}
                                    className="network-avatar"
                                />
                                {user.isOnline && <span className="online-status-dot"></span>}
                            </div>

                            {/* User Info */}
                            <h3 className="network-user-name">{user.name}</h3>
                            <p className="network-user-role">{user.role || user.title}</p>
                            <p className="network-user-bio">{user.bio}</p>

                            {/* Location */}
                            {user.location && (
                                <div className="network-location">
                                    <MapPin size={14} />
                                    <span>{user.location}</span>
                                </div>
                            )}

                            {/* Skills */}
                            {user.skills && user.skills.length > 0 && (
                                <div className="network-skills">
                                    {user.skills.map((skill, index) => (
                                        <span key={index} className="network-skill-tag">{skill}</span>
                                    ))}
                                </div>
                            )}

                            {/* Social Icons */}
                            <div className="network-social-icons">
                                {user.github && (
                                    <a href={user.github} className="network-social-icon" target="_blank" rel="noopener noreferrer">
                                        <Github size={18} />
                                    </a>
                                )}
                                {user.linkedin && (
                                    <a href={user.linkedin} className="network-social-icon" target="_blank" rel="noopener noreferrer">
                                        <Linkedin size={18} />
                                    </a>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="network-card-actions">
                                <button
                                    className="network-connect-btn"
                                    onClick={() => handleConnect(user.id)}
                                    disabled={isConnectButtonDisabled(user.connectionStatus)}
                                >
                                    {getConnectButtonText(user.connectionStatus)}
                                </button>
                                <Link
                                    to={`/dashboard/chat/${user.id}`}
                                    className="network-message-btn glass-btn"
                                >
                                    <MessageCircle size={18} />
                                    Message
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredUsers.length === 0 && (
                <div className="network-empty-state">
                    <p>No users found matching your search.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && pagination.pages > 1 && (
                <div className="network-pagination">
                    <button
                        onClick={() => fetchUsers(pagination.page - 1, searchQuery)}
                        disabled={!pagination.hasPrev}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="pagination-info">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                        onClick={() => fetchUsers(pagination.page + 1, searchQuery)}
                        disabled={!pagination.hasNext}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
