/**
 * Loading Component
 * Automatically shown by Next.js App Router during navigation
 * and page transitions
 * 
 * Location: app/loading.tsx
 * This file is used by Next.js to show a loading UI while:
 * - Navigating between pages
 * - Loading server components
 * - Suspense boundaries
 */

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                {/* Spinner */}
                <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
                    <div className="absolute w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>

                {/* Loading Text */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Loading...
                </h2>
                <p className="text-gray-600">Please wait while we load your content</p>

                {/* Dots Animation */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                </div>
            </div>
        </div>
    );
}
