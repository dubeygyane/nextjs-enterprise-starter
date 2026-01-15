'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { performLogout } from '@/utils/logout';

/**
 * Simple mutation hook - just pass endpoint and method!
 * 
 * @example POST
 * const create = useMutate('/users', 'POST');
 * create.mutate({ name: 'John' });
 * 
 * @example DELETE
 * const deleteUser = useMutate('/users/123', 'DELETE');
 * deleteUser.mutate();
 * 
 * @example With options
 * const create = useMutate('/users', 'POST', {
 *   invalidates: ['/users'],
 *   onSuccess: (data) => console.log('Created!', data),
 * });
 */

type MutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function useMutate<TData = unknown, TVariables = unknown>(
    endpoint: string,
    method: MutationMethod = 'POST',
    options?: {
        /** Keys to invalidate after success */
        invalidates?: string[];
        /** Callback on success */
        onSuccess?: (data: TData) => void;
        /** Callback on error */
        onError?: (error: AxiosError) => void;
        /** If true, 401/403 errors won't trigger global logout/redirect */
        suppressAuthRedirect?: boolean;
    }
) {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<TData, AxiosError, TVariables>({
        mutationFn: async (variables: TVariables) => {
            let response;
            switch (method) {
                case 'POST':
                    response = await axiosInstance.post<TData>(endpoint, variables);
                    break;
                case 'PUT':
                    response = await axiosInstance.put<TData>(endpoint, variables);
                    break;
                case 'PATCH':
                    response = await axiosInstance.patch<TData>(endpoint, variables);
                    break;
                case 'DELETE':
                    response = await axiosInstance.delete<TData>(endpoint);
                    break;
            }
            return response.data;
        },
        onSuccess: (data) => {
            // Invalidate caches
            options?.invalidates?.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            // Call user callback
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            const status = error.response?.status;

            // Handle auth errors (unless suppressed)
            if (!options?.suppressAuthRedirect && (status === 401 || status === 403)) {
                performLogout();
                router.push('/login?error=unauthorized');
            }

            // Call user callback
            options?.onError?.(error);
        },
    });
}
