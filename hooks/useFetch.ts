'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { performLogout } from '@/utils/logout';

/**
 * Ultra-simple fetch hook - just pass endpoint, get data!
 * 
 * Features:
 * - Automatically passes token via Axios interceptor
 * - Handles 401 errors and redirects to login
 * - Returns data, loading state, error, and refetch
 * 
 * @example
 * const { data, isLoading, error, refetch } = useFetch('/users');
 * 
 * @example With type safety
 * const { data, isLoading } = useFetch<User[]>('/users');
 */

interface UseFetchOptions {
    /** Optional: Only fetch when this is true */
    enabled?: boolean;
    /** Optional: Custom cache time (default: 5 minutes) */
    staleTime?: number;
}

export function useFetch<TData = unknown>(
    endpoint: string,
    options?: UseFetchOptions
) {
    const router = useRouter();

    const query = useQuery<TData, AxiosError>({
        queryKey: [endpoint],
        queryFn: async () => {
            const response = await axiosInstance.get<TData>(endpoint);
            return response.data;
        },
        enabled: options?.enabled ?? true,
        staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes default
        retry: (failureCount, error) => {
            // Don't retry on 401/403 (auth errors)
            if (error.response?.status === 401 || error.response?.status === 403) {
                return false;
            }
            // Retry other errors once
            return failureCount < 1;
        },
    });

    // Handle authentication errors
    useEffect(() => {
        if (query.error) {
            const status = query.error.response?.status;

            if (status === 401 || status === 403) {
                // Use centralized logout
                performLogout();
                router.push('/login?error=unauthorized');
            }
        }
    }, [query.error, router]);

    return {
        data: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        error: query.error,
        refetch: query.refetch,
    };
}
