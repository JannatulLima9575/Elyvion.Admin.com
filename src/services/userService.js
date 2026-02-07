import apiClient from './apiClient.js';

export const userService = {
  // Get all users
  getUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/users?${params.toString()}`);
  },

  // Get user by ID
  getUserById: async (id) => {
    return apiClient.get(`/users/${id}`);
  },

  // Login
  login: async (userName, password) => {
    return apiClient.post('/users/login', { userName, password });
  },
};

