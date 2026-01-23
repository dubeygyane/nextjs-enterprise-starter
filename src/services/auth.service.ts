import axiosInstance from '@/lib/axios';
import { LoginCredentials, AuthResponse } from '@/types/auth';
import { cookieUtils } from '@/utils/cookies';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Manages token storage in cookies
 */

export const authService = {
    /**
     * Login user and store tokens
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>(
            '/login',
            credentials
        );

        const { accessToken, refreshToken } = response.data;

        // Store tokens in cookies
        cookieUtils.setCookie('accessToken', accessToken);
        cookieUtils.setCookie('refreshToken', refreshToken);

        return response.data;
    },

    /**
     * Logout user and clear tokens
     */
    logout: () => {
        cookieUtils.removeAuthCookies();
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!cookieUtils.getCookie('accessToken');
    },

    /**
     * Get access token
     */
    getAccessToken: (): string | undefined => {
        return cookieUtils.getCookie('accessToken');
    },
};
