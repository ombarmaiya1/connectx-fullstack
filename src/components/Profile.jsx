import React from 'react';
import {
    Briefcase, Users, Star, Award, MapPin, Mail,
    Globe, Calendar, Github, Linkedin, Twitter,
    Edit3, Trophy, Zap, Target, MessageCircle, Heart, Share2, Bookmark
} from 'lucide-react';
import { userProfile } from '../data/mockData';

export const Profile = () => {
    return (
        <div className="profile-page">
            {/* Profile Header section */}
            <div className="profile-header-card glass-card">
                <div className="profile-banner"></div>
                <div className="profile-header-content">
                    <div className="profile-avatar-container">
                        <img src={userProfile.avatar} alt={userProfile.name} className="profile-avatar-large" />
                        <div className="avatar-plus-icon">
                            <Zap size={16} fill="currentColor" />
                        </div>
                    </div>

                    <div className="profile-main-info">
                        <div className="profile-name-edit">
                            <h1 className="profile-username">{userProfile.username}</h1>
                            <button className="btn-edit-profile">
                                <Edit3 size={16} />
                                <span>Edit Profile</span>
                            </button>
                        </div>
                        <p className="profile-user-role">{userProfile.role}</p>

                        <div className="profile-social-row">
                            <a href={userProfile.socialLinks.twitter} className="profile-social-icon"><Twitter size={18} /></a>
                            <a href={userProfile.socialLinks.linkedin} className="profile-social-icon"><Linkedin size={18} /></a>
                            <a href={userProfile.socialLinks.github} className="profile-social-icon"><Github size={18} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="profile-stats-grid">
                {userProfile.stats.map((stat, index) => (
                    <div key={index} className={`stat-card glass-card border-${stat.color}`}>
                        <div className={`stat-icon-wrapper bg-${stat.color}`}>
                            {stat.icon === 'Briefcase' && <Briefcase size={20} />}
                            {stat.icon === 'Users' && <Users size={20} />}
                            {stat.icon === 'Star' && <Star size={20} />}
                            {stat.icon === 'Award' && <Award size={20} />}
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="profile-content-layout">
                {/* Left Column */}
                <div className="profile-left-column">
                    {/* Contact Info */}
                    <div className="profile-section-card glass-card">
                        <h2 className="section-title">Contact Information</h2>
                        <div className="contact-list">
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>{userProfile.contactInfo.location}</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>{userProfile.contactInfo.email}</span>
                            </div>
                            <div className="contact-item">
                                <Globe size={18} className="contact-icon" />
                                <span>{userProfile.contactInfo.website}</span>
                            </div>
                            <div className="contact-item">
                                <Calendar size={18} className="contact-icon" />
                                <span>{userProfile.contactInfo.joinDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* About Me */}
                    <div className="profile-section-card glass-card">
                        <div className="section-header">
                            <Zap size={18} className="section-icon text-cyan" />
                            <h2 className="section-title">About Me</h2>
                        </div>
                        <p className="about-text">{userProfile.aboutMe}</p>
                    </div>

                    {/* Skills */}
                    <div className="profile-section-card glass-card">
                        <div className="section-header">
                            <Briefcase size={18} className="section-icon text-cyan" />
                            <h2 className="section-title">Skills & Technologies</h2>
                        </div>
                        <div className="skills-tags">
                            {userProfile.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="profile-section-card glass-card">
                        <div className="section-header">
                            <Trophy size={18} className="section-icon text-cyan" />
                            <h2 className="section-title">Achievements & Awards</h2>
                        </div>
                        <div className="achievements-grid">
                            {userProfile.achievements.map((achievement) => (
                                <div key={achievement.id} className="achievement-card">
                                    <div className={`achievement-icon-bg bg-${achievement.color}`}>
                                        {achievement.icon === 'Trophy' && <Trophy size={18} />}
                                        {achievement.icon === 'Star' && <Star size={18} />}
                                        {achievement.icon === 'Zap' && <Zap size={18} />}
                                        {achievement.icon === 'Target' && <Target size={18} />}
                                    </div>
                                    <div className="achievement-info">
                                        <h3 className="achievement-title">{achievement.title}</h3>
                                        <p className="achievement-desc">{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Column - Activity */}
                <div className="profile-main-column">
                    <div className="profile-section-header">
                        <Briefcase size={20} className="text-cyan" />
                        <h2 className="main-section-title">Posts & Activity</h2>
                    </div>

                    <div className="activity-list">
                        {userProfile.activity.map((item) => (
                            <div key={item.id} className="activity-card glass-card">
                                <div className="activity-header">
                                    <img src={userProfile.avatar} alt={userProfile.name} className="activity-avatar" />
                                    <div className="activity-meta">
                                        <h4 className="activity-author">{userProfile.username}</h4>
                                        <p className="activity-time">{item.time}</p>
                                    </div>
                                </div>
                                <p className="activity-content">{item.content}</p>
                                {item.image && (
                                    <div className="activity-image-container">
                                        <img src={item.image} alt="Activity" className="activity-image" />
                                    </div>
                                )}
                                <div className="activity-stats">
                                    <span>{item.likes} likes</span>
                                    <span className="dot">•</span>
                                    <span>{item.comments} comments</span>
                                </div>
                                <div className="activity-actions">
                                    <button className="action-btn"><Heart size={18} /> Like</button>
                                    <button className="action-btn"><MessageCircle size={18} /> Comment</button>
                                    <button className="action-btn"><Share2 size={18} /> Share</button>
                                    <button className="action-btn"><Bookmark size={18} /> Save</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
