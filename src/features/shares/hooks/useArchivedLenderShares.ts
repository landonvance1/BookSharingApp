import { useState, useEffect, useCallback } from 'react';
import { Share } from '../types';
import { sharesApi } from '../api/sharesApi';

interface UseArchivedLenderSharesReturn {
  archivedLenderShares: Share[];
  loading: boolean;
  error: string | null;
  refreshArchivedLenderShares: () => Promise<void>;
}

export const useArchivedLenderShares = (): UseArchivedLenderSharesReturn => {
  const [archivedLenderShares, setArchivedLenderShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshArchivedLenderShares = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const shares = await sharesApi.getArchivedLenderShares();
      setArchivedLenderShares(shares);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch archived lender shares';
      setError(errorMessage);
      console.error('Error fetching archived lender shares:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshArchivedLenderShares();
  }, [refreshArchivedLenderShares]);

  return {
    archivedLenderShares,
    loading,
    error,
    refreshArchivedLenderShares,
  };
};
