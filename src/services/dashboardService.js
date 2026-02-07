import apiClient from './apiClient.js';

export const dashboardService = {
  // Get dashboard statistics
  getStats: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    return apiClient.get(`/dashboard/stats?${params.toString()}`);
  },

  // Get deposit records
  getDepositRecords: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.customerId) params.append('customerId', filters.customerId);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/deposit-records?${params.toString()}`);
  },
};

