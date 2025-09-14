import { api } from '../../../lib/api';
import { Share } from '../types';

export const sharesApi = {
  getBorrowerShares: async (): Promise<Share[]> => {
    return api.get('/shares/borrower');
  },
};