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
            const { token, ...user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
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
            const { token, ...user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
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
