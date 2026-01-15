import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Widgets } from './Widgets';

export const DashboardLayout = () => {
    const location = useLocation();

    // Determine if current page should use full-width layout
    const isFullWidth = location.pathname.includes('/network') ||
        location.pathname.includes('/opportunities') ||
        location.pathname.includes('/profile');

    if (isFullWidth) {
        return (
            <div className="dashboard-layout">
                <div className="dashboard-container-fullwidth">
                    <main className="dashboard-main-fullwidth">
                        <Outlet />
                    </main>
                </div>
            </div>
        );
    }

    // Three-column layout for Feed page
    return (
        <div className="dashboard-layout">
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <Outlet />
                </main>
                <Widgets />
            </div>
        </div>
    );
};
