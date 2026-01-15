import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { jobs, projects } from '../data/mockData';

export const Opportunities = () => {
    return (
        <div className="opportunities-container">
            {/* Header / Filter Section */}
            <div className="opportunities-header">
                <h1 className="page-title">Discover Opportunities</h1>
                <div className="filter-tabs glass-card">
                    <button className="filter-tab active">All</button>
                    <button className="filter-tab">Jobs</button>
                    <button className="filter-tab">Projects</button>
                    <button className="filter-tab">Mentorship</button>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="opportunities-grid">
                {jobs.map((job) => (
                    <div key={job.id} className="opportunity-card glass-card">
                        <div className="opp-header">
                            <div className="opp-icon-box">
                                <Briefcase size={24} />
                            </div>
                            <div className="opp-meta">
                                <span className="opp-time">{job.postedAt}</span>
                            </div>
                        </div>

                        <h3 className="opp-title">{job.title}</h3>
                        <p className="opp-company">{job.company}</p>

                        <div className="opp-details">
                            <div className="opp-detail-item">
                                <MapPin size={14} />
                                <span>{job.location}</span>
                            </div>
                            <div className="opp-detail-item">
                                <DollarSign size={14} />
                                <span>{job.salary}</span>
                            </div>
                            <div className="opp-detail-item">
                                <Clock size={14} />
                                <span>{job.type}</span>
                            </div>
                        </div>

                        <div className="opp-tags">
                            {job.tags.map(tag => (
                                <span key={tag} className="opp-tag">{tag}</span>
                            ))}
                        </div>

                        <button className="btn-primary btn-full-width">Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
