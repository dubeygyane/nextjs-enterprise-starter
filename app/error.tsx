'use client';

/**
 * Global Error Component
 * Catches errors in the application and displays a user-friendly message
 * Next.js App Router automatically uses this for error boundaries
 */

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Error Icon */}
                <div className="text-6xl mb-4">⚠️</div>

                {/* Error Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Something Went Wrong
                </h1>

                {/* Error Message */}
                <p className="text-gray-600 mb-6">
                    {error.message || 'An unexpected error occurred'}
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && error.digest && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                        <p className="text-xs text-gray-500 font-mono">
                            Error Digest: {error.digest}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => (window.location.href = '/')}
                        className="px-6 py-2.5 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}
