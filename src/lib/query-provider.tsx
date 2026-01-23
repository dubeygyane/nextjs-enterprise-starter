'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState, useEffect } from 'react';
import { registerQueryClient } from '@/utils/logout';

/**
 * React Query Provider Component
 * Wraps the app to enable TanStack Query features:
 * - Caching
 * - Background refetching
 * - Automatic retry logic
 * - Request deduplication
 */

export default function QueryProvider({ children }: { children: ReactNode }) {
    // Create a client instance per component instance
    // This ensures each user gets a fresh QueryClient
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Cache data for 5 minutes
                        staleTime: 5 * 60 * 1000,
                        // Keep unused data in cache for 10 minutes
                        gcTime: 10 * 60 * 1000,
                        // Retry failed requests 1 time
                        retry: 1,
                        // Refetch on window focus
                        refetchOnWindowFocus: true,
                        // Refetch on reconnect
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        // Retry failed mutations once
                        retry: 1,
                    },
                },
            })
    );

    // Register queryClient for centralized logout
    useEffect(() => {
        registerQueryClient(queryClient);
    }, [queryClient]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
