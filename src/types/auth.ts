/**
 * Authentication-related TypeScript types
 */

import { AxiosError } from "axios";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse extends AuthTokens {
    user?: User;
}

/**
 * Standard API error response shape
 * Extend this as your backend grows
 */
export type ApiErrorResponse = {
    error?: string;
    message?: string;
};

/**
 * Strongly typed Axios error
 */
export type ApiAxiosError = AxiosError<ApiErrorResponse>;