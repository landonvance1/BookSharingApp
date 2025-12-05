/**
 * React Query Configuration Constants
 *
 * These values control caching, refetching, and polling behavior
 * across the application.
 */

// How long data stays "fresh" before React Query marks it stale
// Stale data is still displayed but triggers background refetch on access
export const QUERY_STALE_TIME = 30000; // 30 seconds

// How long unused query data stays in cache before garbage collection
// Should generally be >= staleTime to avoid premature cache eviction
export const QUERY_GC_TIME = 5 * 60 * 1000; // 5 minutes

// How often to poll for notification updates
// Balances freshness with API efficiency
export const NOTIFICATIONS_POLL_INTERVAL = 30000; // 30 seconds

// Number of retries for failed queries/mutations
// Low value (1) for faster failure feedback
export const QUERY_RETRY_COUNT = 1;
