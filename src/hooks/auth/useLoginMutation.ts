'use client';

import { useRouter } from 'next/navigation';
import { useMutate } from '@/hooks/useMutate';
import { LoginCredentials, AuthResponse } from '@/types/auth';
import { cookieUtils } from '@/utils/cookies';

/**
 * Custom hook for login mutation
 * Handles login API call and automatic redirect on success
 * Uses our custom useMutate hook for consistency
 * 
 * @example
 * const loginMutation = useLoginMutation();
 * 
 * loginMutation.mutate({ 
 *   email: 'user@example.com', 
 *   password: 'password123' 
 * });
 */

interface UseLoginMutationOptions {
    /** Optional: Custom redirect path after successful login (default: /dashboard) */
    redirectTo?: string;
    /** Optional: Callback on success */
    onSuccess?: (data: AuthResponse) => void;
    /** Optional: Callback on error */
    onError?: (error: Error) => void;
}

export function useLoginMutation(options?: UseLoginMutationOptions) {
    const router = useRouter();
    const redirectTo = options?.redirectTo ?? '/dashboard';

    return useMutate<AuthResponse, LoginCredentials>('/login', 'POST', {
        suppressAuthRedirect: true, // Don't redirect on 401 (invalid credentials)
        onSuccess: (data) => {
            // Store tokens in cookies
            const { accessToken, refreshToken } = data;
            cookieUtils.setCookie('accessToken', accessToken);
            cookieUtils.setCookie('refreshToken', refreshToken);

            // Call custom success callback if provided
            options?.onSuccess?.(data);

            // Redirect to dashboard (or custom path)
            router.push(redirectTo);
        },
        onError: (error) => {
            // Call custom error callback if provided
            options?.onError?.(error);
        },
    });
}
