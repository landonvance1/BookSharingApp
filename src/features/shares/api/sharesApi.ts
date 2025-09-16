import { api } from '../../../lib/api';
import { BorrowerShare, LenderShare } from '../types';

export const sharesApi = {
  getBorrowerShares: async (): Promise<BorrowerShare[]> => {
    return api.get('/shares/borrower');
  },

  getLenderShares: async (): Promise<LenderShare[]> => {
    return api.get('/shares/lender');
  },
};