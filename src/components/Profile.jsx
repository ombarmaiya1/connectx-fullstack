import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, Users, MapPin, Mail,
    Calendar, Edit3, Zap, MessageCircle,
    LogOut, X, Save, Camera, Loader
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

export const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        headline: '',
        bio: '',
        skills: [],
        college: '',
        location: '',
        avatar: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                headline: user.headline || '',
                bio: user.bio || '',
                skills: user.skills || [],
                college: user.college || '',
                location: user.location || '',
                avatar: user.avatar || ''
            });
            setImagePreview(user.avatar || '');
        }
    }, [user]);

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        setError('');
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setError('');
        // Reset form data
        if (user) {
            setFormData({
                name: user.name || '',
                headline: user.headline || '',
                bio: user.bio || '',
                skills: user.skills || [],
                college: user.college || '',
                location: user.location || '',
                avatar: user.avatar || ''
            });
            setImagePreview(user.avatar || '');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSkillsChange = (e) => {
        const skillsText = e.target.value;
        const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
        setFormData(prev => ({ ...prev, skills: skillsArray }));
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await userAPI.updateProfile(formData);

            // Update user in AuthContext
            updateUser(response.data);

            setIsEditMode(false);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <Loader className="spinner" size={40} />
                <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading profile...</p>
            </div>
        );
    }

    const displaySkills = formData.skills.length > 0 ? formData.skills : ['No skills added yet'];
    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently joined';

    return (
        <div className="profile-page">
            {/* Edit Mode Modal Overlay */}
            {isEditMode && (
                <div className="modal-overlay" onClick={handleCancelEdit}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Edit Profile</h2>
                            <button className="modal-close-btn" onClick={handleCancelEdit}>
                                <X size={24} />
                            </button>
                        </div>

                        {error && (
                            <div style={{ padding: '12px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)', borderRadius: '8px', color: '#ff5555', marginBottom: '16px' }}>
                                {error}
                            </div>
                        )}

                        <div className="modal-body">
                            {/* Profile Picture Upload */}
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={imagePreview || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-primary)' }}
                                    />
                                    <button
                                        className="avatar-upload-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                        type="button"
                                    >
                                        <Camera size={20} />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Click camera to change photo</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={user.email}
                                    disabled
                                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                />
                                <small style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Email cannot be changed</small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Headline</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.headline}
                                    onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                                    placeholder="e.g., Full Stack Developer at Google"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <textarea
                                    className="form-input"
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Tell us about yourself..."
                                    rows={4}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">College/University</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.college}
                                    onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                                    placeholder="e.g., MIT"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="e.g., San Francisco, CA"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Skills (comma-separated)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.skills.join(', ')}
                                    onChange={handleSkillsChange}
                                    placeholder="e.g., React, Node.js, Python"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={handleCancelEdit} disabled={loading}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleSaveProfile} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader className="spinner" size={16} />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Header section */}
            <div className="profile-header-card glass-card">
                <div className="profile-banner"></div>
                <div className="profile-header-content">
                    <div className="profile-avatar-container">
                        <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.name} className="profile-avatar-large" />
                        <div className="avatar-plus-icon">
                            <Zap size={16} fill="currentColor" />
                        </div>
                    </div>

                    <div className="profile-main-info">
                        <div className="profile-name-edit">
                            <h1 className="profile-username">{user.name}</h1>
                            <button className="btn-edit-profile" onClick={handleEditClick}>
                                <Edit3 size={16} />
                                <span>Edit Profile</span>
                            </button>
                        </div>
                        <p className="profile-user-role">{user.headline || 'No headline set'}</p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="profile-stats-grid">
                <div className="stat-card glass-card border-blue">
                    <div className="stat-icon-wrapper bg-blue">
                        <Users size={20} />
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{user.connections?.length || 0}</div>
                        <div className="stat-label">Connections</div>
                    </div>
                </div>
                <div className="stat-card glass-card border-purple">
                    <div className="stat-icon-wrapper bg-purple">
                        <Users size={20} />
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{user.followers?.length || 0}</div>
                        <div className="stat-label">Followers</div>
                    </div>
                </div>
                <div className="stat-card glass-card border-green">
                    <div className="stat-icon-wrapper bg-green">
                        <Users size={20} />
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{user.following?.length || 0}</div>
                        <div className="stat-label">Following</div>
                    </div>
                </div>
                <div className="stat-card glass-card border-orange">
                    <div className="stat-icon-wrapper bg-orange">
                        <Briefcase size={20} />
                    </div>
                    <div className="stat-info">
                        <div className="stat-value">{displaySkills.length}</div>
                        <div className="stat-label">Skills</div>
                    </div>
                </div>
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
                                <span>{user.location || 'No location set'}</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>{user.email}</span>
                            </div>
                            <div className="contact-item">
                                <Calendar size={18} className="contact-icon" />
                                <span>Joined {joinDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* About Me */}
                    <div className="profile-section-card glass-card">
                        <div className="section-header">
                            <Zap size={18} className="section-icon text-cyan" />
                            <h2 className="section-title">About Me</h2>
                        </div>
                        <p className="about-text">{user.bio || 'No bio added yet. Click "Edit Profile" to add one!'}</p>
                    </div>

                    {/* Skills */}
                    <div className="profile-section-card glass-card">
                        <div className="section-header">
                            <Briefcase size={18} className="section-icon text-cyan" />
                            <h2 className="section-title">Skills & Technologies</h2>
                        </div>
                        <div className="skills-tags">
                            {displaySkills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Sign Out Button */}
                    <div className="profile-section-card glass-card">
                        <button
                            className="btn-signout"
                            onClick={handleSignOut}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                background: 'rgba(255, 59, 48, 0.1)',
                                border: '1px solid rgba(255, 59, 48, 0.3)',
                                borderRadius: '12px',
                                color: '#ff3b30',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)';
                                e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.3)';
                            }}
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                {/* Main Column - Info */}
                <div className="profile-main-column">
                    <div className="profile-section-card glass-card">
                        <div className="section-header" style={{ marginBottom: '20px' }}>
                            <Briefcase size={20} className="text-cyan" />
                            <h2 className="main-section-title">College Information</h2>
                        </div>
                        <div style={{ padding: '16px', background: 'rgba(var(--brand-primary-rgb), 0.05)', borderRadius: '12px', border: '1px solid rgba(var(--brand-primary-rgb), 0.1)' }}>
                            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px' }}>College/University</p>
                            <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                {user.college || 'No college information added'}
                            </p>
                        </div>
                    </div>

                    <div className="profile-section-card glass-card" style={{ marginTop: '24px' }}>
                        <div className="section-header" style={{ marginBottom: '20px' }}>
                            <MessageCircle size={20} className="text-cyan" />
                            <h2 className="main-section-title">Activity</h2>
                        </div>
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                            <MessageCircle size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                            <p>No posts yet. Start sharing your thoughts!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
