"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useFetch } from "@/hooks/useFetch";
import { performLogout } from "@/utils/logout";
import {
  UserIcon,
  StatsIcon,
  LightningIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Dashboard Page Component
 * Protected route that fetches and displays user data
 * Authentication is handled by middleware.ts at the Edge level
 * Demonstrates ultra-simple useFetch hook
 */

interface UserData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  };
  stats: {
    loginCount: number;
    lastLogin: string;
    lastLoginDate?: string; // Corrected field name inference
  };
}

export default function DashboardPage() {
  const router = useRouter();
  // useFetch automatically handles auth:
  // - Token is attached via axios interceptor
  // - 401 errors trigger automatic token refresh
  const { data, isLoading, error, refetch } = useFetch<UserData>("/user");

  const handleLogout = () => {
    // Use centralized logout (clears cookies + React Query cache)
    performLogout();

    // Redirect to login
    router.push("/login");
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error Loading Data"
        message={
          error instanceof Error ? error.message : "Something went wrong"
        }
        onRetry={() => refetch()}
        retryLabel="Try Again"
      >
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </ErrorState>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {data?.user.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You{"'"}re now viewing protected content from the dashboard.
          </p>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              Profile Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  User ID
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {data?.user.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {data?.user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {data?.user.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                  {data?.user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <StatsIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              Account Statistics
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Logins
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {data?.stats.loginCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Login
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {data?.stats.lastLogin
                    ? new Date(data.stats.lastLogin).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Created
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {data?.user.createdAt
                    ? new Date(data.user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* React Query Demo Card */}
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-md p-6 border border-blue-200 dark:border-blue-900 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <LightningIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            TanStack Query Features Demonstrated
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <span>
                <strong>Automatic Caching:</strong> Data is cached for 5 minutes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <span>
                <strong>Background Refetch:</strong> Data refetches on window
                focus
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <span>
                <strong>Loading States:</strong> Smooth loading experience
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <span>
                <strong>Error Handling:</strong> Graceful error recovery with
                retry
              </span>
            </li>
          </ul>
          <div className="mt-4">
            <Button
              onClick={() => refetch()}
              variant="primary"
              className="text-sm"
            >
              Refetch Data
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
