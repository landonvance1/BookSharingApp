import { api } from '../../../lib/api';
import { Share } from '../types';
import { ShareStatus } from '../../../lib/constants';

interface ShareStatusUpdateRequest {
  Status: ShareStatus;
}

export const sharesApi = {
  getBorrowerShares: async (): Promise<Share[]> => {
    return api.get('/shares/borrower');
  },

  getLenderShares: async (): Promise<Share[]> => {
    return api.get('/shares/lender');
  },

  updateShareStatus: async (shareId: number, status: ShareStatus): Promise<Share> => {
    const request: ShareStatusUpdateRequest = { Status: status };
    return api.put(`/shares/${shareId}/status`, request);
  },
};