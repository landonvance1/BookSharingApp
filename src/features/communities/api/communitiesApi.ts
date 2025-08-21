import { api } from '../../../lib/api';
import { Community, CommunityWithMemberCount } from '../types';

export const communitiesApi = {
  getAllCommunities: async (): Promise<Community[]> => {
    return api.get('/communities');
  },
  
  getUserCommunities: async (userId: string): Promise<CommunityWithMemberCount[]> => {
    return api.get(`/community-users/user/${userId}`);
  },
  
  getCommunityById: async (id: number): Promise<Community> => {
    return api.get(`/communities/${id}`);
  },
  
  addCommunity: async (community: Omit<Community, 'id'>): Promise<Community> => {
    return api.post('/communities', community);
  },
  
  leaveCommunity: async (communityId: number, userId: string): Promise<void> => {
    return api.delete('/community-users/leave', {
      CommunityId: communityId,
      UserId: userId
    });
  },
};