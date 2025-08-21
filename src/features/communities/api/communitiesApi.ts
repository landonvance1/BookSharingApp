import { api } from '../../../lib/api';
import { Community } from '../types';

export const communitiesApi = {
  getAllCommunities: async (): Promise<Community[]> => {
    return api.get('/communities');
  },
  
  getCommunityById: async (id: number): Promise<Community> => {
    return api.get(`/communities/${id}`);
  },
  
  addCommunity: async (community: Omit<Community, 'id'>): Promise<Community> => {
    return api.post('/communities', community);
  },
};