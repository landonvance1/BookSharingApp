import { useState, useEffect, useCallback } from 'react';
import { Share } from '../types';
import { sharesApi } from '../api/sharesApi';

interface UseArchivedSharesReturn {
  archivedShares: Share[];
  loading: boolean;
  error: string | null;
  refreshArchivedShares: () => Promise<void>;
}

export const useArchivedShares = (): UseArchivedSharesReturn => {
  const [archivedShares, setArchivedShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshArchivedShares = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const shares = await sharesApi.getArchivedBorrowerShares();
      setArchivedShares(shares);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch archived shares';
      setError(errorMessage);
      console.error('Error fetching archived shares:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshArchivedShares();
  }, [refreshArchivedShares]);

  return {
    archivedShares,
    loading,
    error,
    refreshArchivedShares,
  };
};
