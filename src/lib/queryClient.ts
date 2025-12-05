import { QueryClient } from '@tanstack/react-query';
import {
  QUERY_STALE_TIME,
  QUERY_GC_TIME,
  QUERY_RETRY_COUNT,
} from './queryConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: QUERY_RETRY_COUNT,
    },
    mutations: {
      retry: QUERY_RETRY_COUNT,
    },
  },
});
