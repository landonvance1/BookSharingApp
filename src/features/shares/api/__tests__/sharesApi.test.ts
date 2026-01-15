import { sharesApi } from '../sharesApi';
import { ShareStatus } from '../../../../lib/constants';
import * as SecureStore from 'expo-secure-store';

describe('sharesApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock a token in SecureStore for authenticated requests
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mock-token');
  });

  describe('getBorrowerShares', () => {
    it('should fetch borrower shares successfully', async () => {
      const shares = await sharesApi.getBorrowerShares();

      expect(shares).toBeDefined();
      expect(Array.isArray(shares)).toBe(true);
      expect(shares.length).toBeGreaterThan(0);
      expect(shares[0]).toHaveProperty('id');
      expect(shares[0]).toHaveProperty('userBook');
      expect(shares[0]).toHaveProperty('borrowerUser');
    });
  });

  describe('getLenderShares', () => {
    it('should fetch lender shares successfully', async () => {
      const shares = await sharesApi.getLenderShares();

      expect(shares).toBeDefined();
      expect(Array.isArray(shares)).toBe(true);
      expect(shares.length).toBeGreaterThan(0);
    });
  });

  describe('getArchivedBorrowerShares', () => {
    it('should fetch archived borrower shares', async () => {
      const shares = await sharesApi.getArchivedBorrowerShares();

      expect(shares).toBeDefined();
      expect(Array.isArray(shares)).toBe(true);
    });
  });

  describe('getArchivedLenderShares', () => {
    it('should fetch archived lender shares', async () => {
      const shares = await sharesApi.getArchivedLenderShares();

      expect(shares).toBeDefined();
      expect(Array.isArray(shares)).toBe(true);
    });
  });

  describe('updateShareStatus', () => {
    it('should update share status successfully', async () => {
      const shareId = 1;
      const newStatus = ShareStatus.Ready;

      const updatedShare = await sharesApi.updateShareStatus(shareId, newStatus);

      expect(updatedShare).toBeDefined();
      expect(updatedShare.id).toBe(shareId);
      expect(updatedShare.status).toBe(newStatus);
    });
  });

  describe('updateReturnDate', () => {
    it('should update return date successfully', async () => {
      const shareId = 1;
      const returnDate = '2026-03-01T00:00:00Z';

      const updatedShare = await sharesApi.updateReturnDate(shareId, returnDate);

      expect(updatedShare).toBeDefined();
      expect(updatedShare.id).toBe(shareId);
      expect(updatedShare.returnDate).toBe(returnDate);
    });
  });

  describe('archiveShare', () => {
    it('should archive share successfully', async () => {
      const shareId = 1;

      await expect(sharesApi.archiveShare(shareId)).resolves.not.toThrow();
    });
  });

  describe('unarchiveShare', () => {
    it('should unarchive share successfully', async () => {
      const shareId = 1;

      await expect(sharesApi.unarchiveShare(shareId)).resolves.not.toThrow();
    });
  });

  describe('disputeShare', () => {
    it('should dispute share successfully', async () => {
      const shareId = 1;

      const updatedShare = await sharesApi.disputeShare(shareId);

      expect(updatedShare).toBeDefined();
      expect(updatedShare.id).toBe(shareId);
      expect(updatedShare.isDisputed).toBe(true);
      expect(updatedShare.disputedBy).toBeDefined();
    });
  });
});
