import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookieUtils } from '@/utils/cookies';

/**
 * Custom Axios instance with request/response interceptors
 * Handles token attachment and automatic token refresh
 * SSR-safe implementation
 */

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Track if we're currently refreshing to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

/**
 * Request Interceptor
 * Automatically attaches accessToken from cookies to every request
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Only run on client-side to avoid SSR issues
        if (typeof window !== 'undefined') {
            const token = cookieUtils.getCookie('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles 401 errors and automatic token refresh
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Only handle 401 on client-side
        if (
            typeof window !== 'undefined' &&
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/login') // Don't intercept login requests
        ) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = cookieUtils.getCookie('refreshToken');

            if (!refreshToken) {
                // No refresh token, redirect to login
                processQueue(new Error('No refresh token'));
                isRefreshing = false;
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Attempt to refresh the token
                const response = await axios.post('/api/refresh', {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Store new tokens
                cookieUtils.setCookie('accessToken', accessToken);
                cookieUtils.setCookie('refreshToken', newRefreshToken);

                // Update the failed request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                processQueue();
                isRefreshing = false;

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                processQueue(refreshError as Error);
                isRefreshing = false;
                cookieUtils.removeAuthCookies();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
