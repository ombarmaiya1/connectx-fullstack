import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setLoading(true);

        const result = await login(formData);

        setLoading(false);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setLocalError(result.error || 'Login failed. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Left Side - Branding */}
                <div className="auth-left">
                    <Link to="/" className="auth-logo">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="var(--brand-primary)" strokeWidth="2" />
                            <path d="M12 16L14.5 18.5L20 13" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="auth-logo-text">Connect X</span>
                    </Link>

                    <div className="auth-hero">
                        <h1 className="auth-hero-title">
                            Welcome Back to<br />
                            Your Network
                        </h1>
                        <p className="auth-hero-subtitle">
                            Continue building meaningful professional connections and discover new opportunities.
                        </p>
                    </div>

                    <div className="auth-features">
                        <div className="auth-feature-item">
                            <div className="feature-dot"></div>
                            <span>AI-Powered Matching</span>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-dot"></div>
                            <span>Smart Networking</span>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-dot"></div>
                            <span>Real-time Connections</span>
                        </div>
                    </div>

                    <div className="auth-gradient-blob"></div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-right">
                    <div className="auth-form-container">
                        <div className="auth-form-header">
                            <h2 className="auth-form-title">Log In</h2>
                            <p className="auth-form-subtitle">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {(localError || error) && (
                                <div style={{ padding: '12px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)', borderRadius: '8px', color: '#ff5555', marginBottom: '16px', fontSize: '14px' }}>
                                    {localError || error}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-extras">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                                <span>{loading ? 'Logging in...' : 'Log In'}</span>
                                {!loading && <ArrowRight size={20} />}
                            </button>

                            <div className="auth-divider">
                                <span>or continue with</span>
                            </div>

                            <div className="social-auth">
                                <button type="button" className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <path fill="currentColor" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" />
                                        <path fill="currentColor" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" />
                                        <path fill="currentColor" d="M5.68 11.98c-.2-.59-.32-1.22-.32-1.98 0-.76.12-1.39.32-1.98V5.49H1.07A10.02 10.02 0 000 10c0 1.61.39 3.14 1.07 4.51l4.61-2.53z" />
                                        <path fill="currentColor" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.49l4.61 2.53c.8-2.41 3.04-4.14 5.68-4.14z" />
                                    </svg>
                                    Google
                                </button>
                                <button type="button" className="social-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>

                            <p className="auth-footer-text">
                                Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
