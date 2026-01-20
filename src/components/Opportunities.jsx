import React, { useState, useEffect } from 'react';
import { communityAPI } from '../services/api';
import {
    Search, Filter, Users, MessageSquare,
    Calendar, Layout, TrendingUp, MessageCircle,
    ThumbsUp, Trophy, Plus, MapPin,
    Share2
} from 'lucide-react';
import { communityDiscussions, topContributors, hubStats, communityEvents } from '../data/mockData';

export const Opportunities = () => {
    const [activeTab, setActiveTab] = useState('Discussions');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [events, setEvents] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsRes, discussionsRes, eventsRes, contributorsRes] = await Promise.all([
                    communityAPI.getSummary(),
                    communityAPI.getDiscussions({ search: searchQuery }),
                    communityAPI.getEvents(),
                    communityAPI.getTopContributors()
                ]);

                // Transform Stats
                const s = statsRes.data.data;
                setStats([
                    { label: "Active Members", value: s.activeMembers, icon: "Users" },
                    { label: "Discussions", value: s.discussionsCount, icon: "MessageSquare" },
                    { label: "Events", value: s.eventsCount, icon: "Calendar" },
                    { label: "Projects Started", value: s.projectsStarted, icon: "Layout" }
                ]);

                // Transform Discussions for UI
                setDiscussions(discussionsRes.data.data.map(d => ({
                    ...d,
                    college: d.author_college || 'Community Member',
                    match: d.match_score || 0,
                    time: d.time_ago,
                    replies: d.replies_count,
                    likes: d.likes_count,
                    avatar: d.author_avatar || `https://ui-avatars.com/api/?name=${d.author_name}&background=random`
                })));

                // Transform Events for UI
                setEvents(eventsRes.data.data.map(e => ({
                    ...e,
                    attendees: e.attendees_count,
                    date: e.formatted_date
                })));

                setContributors(contributorsRes.data.data.map(c => ({
                    ...c,
                    avatar: c.avatar || `https://ui-avatars.com/api/?name=${c.name}&background=random`
                })));

            } catch (error) {
                console.error("Failed to fetch community data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery]);

    const IconComponent = ({ name, size = 20 }) => {
        const icons = {
            Users: <Users size={size} />,
            MessageSquare: <MessageSquare size={size} />,
            Calendar: <Calendar size={size} />,
            Layout: <Layout size={size} />
        };
        return icons[name] || null;
    };

    if (loading) {
        return (
            <div className="hub-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                <div className="spinner">Loading Community Hub...</div>
            </div>
        );
    }

    return (
        <div className="hub-container">
            {/* Header */}
            <header className="hub-header">
                <h1 className="hub-title">Community Hub</h1>
                <p className="hub-subtitle">Connect, collaborate, and learn with students from top colleges worldwide</p>
            </header>

            {/* Stats Cards */}
            <div className="hub-stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="hub-stat-card glass-card">
                        <div className="stat-icon-wrapper">
                            <IconComponent name={stat.icon} size={18} />
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        <h2 className="stat-value">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="hub-main-content">
                <div className="hub-left-column">
                    {/* Tabs */}
                    <div className="hub-tabs glass-card">
                        <button
                            className={`hub-tab ${activeTab === 'Discussions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Discussions')}
                        >
                            Discussions
                        </button>
                        <button
                            className={`hub-tab ${activeTab === 'Events' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Events')}
                        >
                            Events
                        </button>
                    </div>

                    {/* Content Section */}

                    {activeTab === 'Discussions' && (
                        <div className="hub-social-feed">
                            {/* Search & Filter */}
                            <div className="hub-actions">
                                <div className="hub-search-wrapper glass-card">
                                    <Search size={20} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search discussions..."
                                        className="hub-search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="hub-filter-btn glass-card">
                                    <Filter size={20} />
                                </button>
                            </div>

                            <div className="hub-discussions-list">
                                {discussions.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>No discussions found. Start one!</p>
                                ) : (
                                    discussions.map((post) => (
                                        <div key={post.id} className="discussion-card glass-card">
                                            <div className="card-top">
                                                <div className="user-info">
                                                    <img src={post.avatar} alt={post.author_name} className="user-avatar" />
                                                    <div className="user-details">
                                                        <div className="title-row">
                                                            <h3 className="post-title">{post.title}</h3>
                                                            {post.is_trending && (
                                                                <span className="trending-badge">
                                                                    <TrendingUp size={12} />
                                                                    Trending
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="post-meta">{post.author_name} • {post.college} • {post.time}</p>
                                                    </div>
                                                </div>
                                                <div className="match-score">
                                                    <span className="match-value">{post.match}% Match</span>
                                                </div>
                                            </div>
                                            <p className="post-description">{post.description}</p>
                                            <div className="post-tags">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="post-tag">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="card-footer">
                                                <div className="interaction-stats">
                                                    <span className="stat-item"><ThumbsUp size={16} /> {post.likes}</span>
                                                    <span className="stat-item"><MessageCircle size={16} /> {post.replies} replies</span>
                                                    <span className="stat-item"><Share2 size={16} /></span>
                                                </div>
                                                <button className="view-btn">View Discussion</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Events' && (
                        <div className="hub-social-feed">
                            <div className="hub-actions">
                                <div className="hub-search-wrapper glass-card">
                                    <Search size={20} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        className="hub-search-input"
                                    />
                                </div>
                                <button className="hub-filter-btn glass-card">
                                    <Filter size={20} />
                                </button>
                            </div>

                            <div className="hub-discussions-list">
                                {events.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>No upcoming events.</p>
                                ) : (
                                    events.map((event) => (
                                        <div key={event.id} className="discussion-card glass-card">
                                            <div className="card-top">
                                                <div className="user-info">
                                                    <div className="event-date-badge">
                                                        <Calendar size={18} />
                                                    </div>
                                                    <div className="user-details">
                                                        <div className="title-row">
                                                            <h3 className="post-title">{event.title}</h3>
                                                        </div>
                                                        <p className="post-meta">{event.organizer} • {event.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="event-location">
                                                <MapPin size={14} />
                                                <span>{event.location}</span>
                                            </div>
                                            {event.image && <img src={event.image} alt={event.title} className="hub-post-img" />}
                                            <div className="post-tags">
                                                {event.tags.map(tag => (
                                                    <span key={tag} className="post-tag">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="card-footer">
                                                <div className="interaction-stats">
                                                    <span className="stat-item"><Users size={16} /> {event.attendees} attending</span>
                                                </div>
                                                <button className="view-btn">Join Event</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="hub-right-column">
                    <div className="contributors-panel glass-card">
                        <div className="panel-header">
                            <Trophy size={20} className="panel-icon" />
                            <h3 className="panel-title">Top Contributors</h3>
                        </div>
                        <div className="contributors-list">
                            {contributors.map((user, index) => (
                                <div key={user.id} className="contributor-item">
                                    <div className="contributor-rank">{index + 1}</div>
                                    <img src={user.avatar} alt={user.name} className="contributor-avatar" />
                                    <div className="contributor-info">
                                        <h4 className="contributor-name">{user.name}</h4>
                                        <p className="contributor-college">{user.college}</p>
                                    </div>
                                    <div className="contributor-stats">
                                        <span className="post-count">{user.posts}</span>
                                        <span className="count-label">posts</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create-panel glass-card">
                        <h3 className="panel-title">Create New</h3>
                        <div className="create-actions">
                            <button className="create-btn primary">
                                <Plus size={20} />
                                Start Discussion
                            </button>
                            <button className="create-btn secondary">
                                <Calendar size={20} />
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
