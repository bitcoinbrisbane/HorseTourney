import { useState, useEffect } from 'react';
import { Meet } from '../types';
import { fetchMeets } from '../services/api';

interface UseMeetsReturn {
  meets: Meet[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMeets(): UseMeetsReturn {
  const [meets, setMeets] = useState<Meet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMeets();
      setMeets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch meets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeets();
  }, []);

  return { meets, loading, error, refetch: loadMeets };
}
