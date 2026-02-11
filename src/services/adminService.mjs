import apiClient from './apiClient.js';

export const adminService = {
  // Get all users
  getUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.id) params.append('id', filters.id);
    
    return apiClient.get(`/admin?${params.toString()}`);
  },

  // Get user by ID
  getUserById: async (id) => {
    return apiClient.get(`/admin/${id}`);
  },

  // Login
  login: async (adminName, password) => {
    return apiClient.post('/admin/login', { adminName, password });
  },
};

