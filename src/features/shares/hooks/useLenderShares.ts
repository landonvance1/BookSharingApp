import { useState, useEffect, useCallback } from 'react';
import { Share } from '../types';
import { sharesApi } from '../api/sharesApi';

interface UseLenderSharesReturn {
  lenderShares: Share[];
  loading: boolean;
  error: string | null;
  refreshLenderShares: () => Promise<void>;
}

export const useLenderShares = (): UseLenderSharesReturn => {
  const [lenderShares, setLenderShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshLenderShares = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allShares = await sharesApi.getLenderShares();

      // Sort by status (ascending) and then by book title
      const sortedShares = allShares.sort((a, b) => {
        if (a.status !== b.status) {
          return a.status - b.status;
        }
        return a.userBook.book.title.localeCompare(b.userBook.book.title);
      });

      setLenderShares(sortedShares);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch lender shares';
      setError(errorMessage);
      console.error('Error fetching lender shares:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLenderShares();
  }, [refreshLenderShares]);

  return {
    lenderShares,
    loading,
    error,
    refreshLenderShares,
  };
};