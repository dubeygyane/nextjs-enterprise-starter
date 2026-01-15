'use client';

import type { QueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

/**
 * Centralized Logout Utility
 * Handles complete logout process:
 * - Clears auth cookies
 * - Clears React Query cache
 * - Can be extended for other cleanup tasks
 */

let globalQueryClient: QueryClient | null = null;

/**
 * Register the QueryClient instance
 * Should be called once during app initialization
 */
export function registerQueryClient(queryClient: QueryClient) {
    globalQueryClient = queryClient;
}

/**
 * Centralized logout function
 * Clears cookies and React Query cache
 */
export function performLogout() {
    // Clear auth cookies
    authService.logout();

    // Clear React Query cache if available
    globalQueryClient?.clear();
}
