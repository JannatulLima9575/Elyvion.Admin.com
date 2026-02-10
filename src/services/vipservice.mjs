import apiClient from './apiClient.js';

export const vipService = {
  getLevels: async () => {
    return apiClient.get('vip/all');
  },


  // Update  level
  updateLevel: async (levelData, id ) => {
    return apiClient.patch(`vip/${id}`, levelData);
  },

};

