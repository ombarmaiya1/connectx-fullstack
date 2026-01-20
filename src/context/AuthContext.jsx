import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authAPI.getMe();
                    setUser(response.data);
                } catch (err) {
                    console.error('Auth check failed:', err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const getErrorMessage = (error) => {
        // Log the full error to console for debugging
        if (error.response) {
            console.error('Auth Error Status:', error.response.status);
            console.error('Auth Error Data:', error.response.data);
        } else {
            console.error('Auth Error:', error.message);
        }

        if (!error.response) return 'Network error or server not reachable';

        const data = error.response.data;
        if (!data) return error.message || 'An unexpected error occurred';

        // Handle Django DRF field errors (e.g. { "email": ["Invalid email"] })
        if (typeof data === 'object' && !Array.isArray(data)) {
            // Check for explicit "message" or "detail" keys first
            if (data.message) return data.message;
            if (data.detail) return data.detail;

            // Otherwise, join all field errors
            const messages = Object.entries(data).map(([key, value]) => {
                const text = Array.isArray(value) ? value.join(' ') : String(value);
                // capitalize key
                const field = key.charAt(0).toUpperCase() + key.slice(1);
                return `${field}: ${text}`;
            });

            if (messages.length > 0) return messages.join('\n');
        }

        if (typeof data === 'string') return data;

        return 'An error occurred';
    };

    const signup = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.signup(userData);
            // Backend returns: { user, access, refresh }
            const { access, user } = response.data;

            if (access) {
                localStorage.setItem('token', access);
                // Standardize user object if needed, or just set it
                setUser(user);
                return { success: true };
            } else {
                throw new Error('No access token received');
            }
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await authAPI.login(credentials);
            // Default SimpleJWT returns: { access, refresh }
            const { access } = response.data;

            if (access) {
                localStorage.setItem('token', access);
                // Fetch user data since login doesn't return it
                try {
                    const userResponse = await authAPI.getMe();
                    setUser(userResponse.data);
                } catch (userErr) {
                    console.error('Failed to fetch user details after login', userErr);
                    // Fallback/Non-blocking error? Or fail login?
                    // Usually better to fail or try to continue. 
                    // We'll try to continue but user state might be empty.
                }
                return { success: true };
            } else {
                throw new Error('No access token received');
            }
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = (updatedUserData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedUserData
        }));
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
