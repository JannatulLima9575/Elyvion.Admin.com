import apiClient from './apiClient.js';

export const customerService = {
  // Get all customers with filters
  getCustomers: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.loginUserName) params.append('loginUserName', filters.loginUserName);
    if (filters.code) params.append('code', filters.code);
    if (filters.ipAddress) params.append('ipAddress', filters.ipAddress);
    if (filters.phoneNumber) params.append('phoneNumber', filters.phoneNumber);
    if (filters.customerStatus) params.append('customerStatus', filters.customerStatus);
    if (filters.onlineOffline) params.append('onlineOffline', filters.onlineOffline);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/customers?${params.toString()}`);
  },

  // Get customer profile
  getCustomerProfile: async (id) => {
    return apiClient.get(`/customers/${id}/profile`);
  },

  // Get customer detail
  getCustomerDetail: async (id) => {
    return apiClient.get(`/customers/${id}/detail`);
  },

  // Login customer
  loginCustomer: async (credentials) => {
    return apiClient.post('/customers/login', credentials);
  },

  // Update customer settings
  updateCustomerSettings: async (id, settings) => {
    return apiClient.patch(`/customers/${id}/settings`, settings);
  },

  // Create customer
  createCustomer: async (customerData) => {
    return apiClient.post('/customers', customerData);
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    return apiClient.patch(`/customers/${id}`, customerData);
  },

  // Delete customer
  deleteCustomer: async (id) => {
    return apiClient.delete(`/customers/${id}`);
  },
};

