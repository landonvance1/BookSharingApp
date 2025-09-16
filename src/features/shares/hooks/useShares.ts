import { useState, useEffect, useCallback } from 'react';
import { Share } from '../types';
import { sharesApi } from '../api/sharesApi';
import { ShareStatus } from '../../../lib/constants';

interface UseSharesReturn {
  shares: Share[];
  loading: boolean;
  error: string | null;
  refreshShares: () => Promise<void>;
}

export const useShares = (): UseSharesReturn => {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshShares = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allShares = await sharesApi.getBorrowerShares();

      // Filter shares with status <= 4 (Requested, Ready, PickedUp, Returned)
      const activeShares = allShares.filter(share => share.status <= ShareStatus.Returned);

      // Sort by status (ascending) and then by book title
      const sortedShares = activeShares.sort((a, b) => {
        if (a.status !== b.status) {
          return a.status - b.status;
        }
        return a.userBook.book.title.localeCompare(b.userBook.book.title);
      });

      setShares(sortedShares);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch shares';
      setError(errorMessage);
      console.error('Error fetching shares:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshShares();
  }, [refreshShares]);

  return {
    shares,
    loading,
    error,
    refreshShares,
  };
};