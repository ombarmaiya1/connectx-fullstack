import React from 'react';

export const Sidebar = () => {
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-profile-card glass-card">
                <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Profile"
                    className="sidebar-avatar"
                />
                <div className="sidebar-user-info">
                    <h3 className="sidebar-name">Alex Morgan</h3>
                    <p className="sidebar-headline">Product Designer at TechFlow</p>
                </div>
                <div className="sidebar-stats">
                    <div className="sidebar-stat">
                        <span className="stat-value">548</span>
                        <span className="stat-label">Connections</span>
                    </div>
                    <div className="sidebar-stat">
                        <span className="stat-value">1.2k</span>
                        <span className="stat-label">Profile Views</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
