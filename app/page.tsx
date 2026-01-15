'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { authService } from '@/services/auth.service';
import {
  ShieldIcon,
  LightningIcon,
  PaletteIcon
} from '@/components/ui/Icons';

/**
 * Home Page Component
 * Landing page with navigation to login or dashboard
 * Demonstrates Next.js App Router and client-side routing
 * 
 * Note: No useState/useEffect for auth check to prevent hydration errors
 * Authentication check happens only on button click
 */

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Check authentication only when user clicks
    if (authService.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Secure & Fast
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Secure Authentication
            </span>
            <br />
            Made Simple
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Modern authentication with Next.js, TypeScript, and TanStack Query.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center gap-4 mb-16">
            <Button
              onClick={handleGetStarted}
              variant="primary"
              className="text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              onClick={() => router.push('/posts')}
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              View Static Blog
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-colors duration-300">
              <ShieldIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Token-based auth with automatic refresh and secure cookie
                storage
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-colors duration-300">
              <LightningIcon className="w-10 h-10 text-yellow-500 dark:text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                TanStack Query
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Advanced caching, background refetching, and optimistic updates
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-colors duration-300">
              <PaletteIcon className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Modern UI
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Beautiful, responsive design with Tailwind CSS and smooth
                animations
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
              Built With Modern Technologies
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Next.js 16</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  TanStack Query
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Tailwind CSS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Axios</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
