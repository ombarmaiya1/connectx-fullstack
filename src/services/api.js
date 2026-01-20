import axios from 'axios';

// Use current origin if not on localhost, otherwise assume local backend
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000') + '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    signup: (userData) => api.post('/auth/signup/', userData),
    login: (credentials) => api.post('/auth/login/', credentials),
    getMe: () => api.get('/auth/me/')
};

// User API
export const userAPI = {
    getProfile: (userId) => api.get(`/users/${userId}/`),
    updateProfile: (userData) => api.put('/users/profile/', userData),
    searchUsers: (query) => api.get(`/users/search/?query=${query}`),
    getSuggested: () => api.get('/users/suggested/')
};

// Post API
export const postAPI = {
    getPosts: () => api.get('/posts/'),
    createPost: (postData) => api.post('/posts/', postData),
    getPost: (postId) => api.get(`/posts/${postId}/`),
    likePost: (postId) => api.post(`/posts/${postId}/like/`),
    addComment: (postId, text) => api.post(`/posts/${postId}/comment/`, { text }),
    deletePost: (postId) => api.delete(`/posts/${postId}/`)
};

// Opportunity API
export const opportunityAPI = {
    getOpportunities: () => api.get('/opportunities/'),
    createOpportunity: (oppData) => api.post('/opportunities/', oppData),
    getOpportunity: (oppId) => api.get(`/opportunities/${oppId}/`),
    applyToOpportunity: (oppId) => api.post(`/opportunities/${oppId}/apply/`)
};

// Connection API
export const connectionAPI = {
    getConnections: () => api.get('/connections/'),
    getPendingRequests: () => api.get('/connections/requests/'),
    sendRequest: (recipientId) => api.post('/connections/request/', { recipientId }),
    acceptRequest: (requestId) => api.put(`/connections/accept/${requestId}/`),
    removeConnection: (userId) => api.delete(`/connections/${userId}/`)
};

// Message API
export const messageAPI = {
    getConversations: () => api.get('/messages/conversations/'),
    getMessages: (userId) => api.get(`/messages/${userId}/`),
    sendMessage: (recipient, content) => api.post('/messages/', { recipient, content })
};

export default api;
