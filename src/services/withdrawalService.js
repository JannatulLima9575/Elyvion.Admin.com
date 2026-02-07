import apiClient from './apiClient.js';

export const withdrawalService = {
  // Get all withdrawals with filters
  getWithdrawals: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.statusID) params.append('statusID', filters.statusID);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.customerId) params.append('customerId', filters.customerId);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/withdrawals?${params.toString()}`);
  },

  // Get withdrawal by ID
  getWithdrawalById: async (id) => {
    return apiClient.get(`/withdrawals/${id}`);
  },

  // Update withdrawal status
  updateWithdrawalStatus: async (id, statusData) => {
    return apiClient.patch(`/withdrawals/${id}/status`, statusData);
  },
};

