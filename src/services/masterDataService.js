import apiClient from './apiClient.js';

export const masterDataService = {
  // Ambassador Levels
  getAmbassadorLevels: async () => {
    return apiClient.get('/ambassador-levels');
  },

  // Currencies
  getCurrencies: async () => {
    return apiClient.get('/currencies');
  },

  // Projects
  getProjects: async () => {
    return apiClient.get('/projects');
  },

  // Sales Statuses
  getSalesStatuses: async () => {
    return apiClient.get('/sales-statuses');
  },

  // Menus
  getMenus: async () => {
    return apiClient.get('/menus');
  },

  // Transaction Records
  getTransactionRecords: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.customerId) params.append('customerId', filters.customerId);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return apiClient.get(`/transaction-records?${params.toString()}`);
  },

  // Create ambassador level
  createAmbassadorLevel: async (levelData) => {
    return apiClient.post('/ambassador-levels', levelData);
  },

  // Update ambassador level
  updateAmbassadorLevel: async (id, levelData) => {
    return apiClient.patch(`/ambassador-levels/${id}`, levelData);
  },

  // Delete ambassador level
  deleteAmbassadorLevel: async (id) => {
    return apiClient.delete(`/ambassador-levels/${id}`);
  },
};

