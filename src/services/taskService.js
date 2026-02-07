import apiClient from './apiClient.js';

export const taskService = {
  // Get all tasklists
  getTasklists: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/tasklists?${params.toString()}`);
  },

  // Get tasklist by ID
  getTasklistById: async (id) => {
    return apiClient.get(`/tasklists/${id}`);
  },

  // Get customer tasks
  getCustomerTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.customerId) params.append('customerId', filters.customerId);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/customer-tasks?${params.toString()}`);
  },

  // Create task
  createTask: async (taskData) => {
    return apiClient.post('/tasklists', taskData);
  },

  // Update task
  updateTask: async (id, taskData) => {
    return apiClient.patch(`/tasklists/${id}`, taskData);
  },

  // Delete task
  deleteTask: async (id) => {
    return apiClient.delete(`/tasklists/${id}`);
  },
};

