import { Skeleton } from '@/components/ui/Skeleton';

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
            {/* Header Skeleton */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
                    <Skeleton className="h-8 w-64 mb-4" />
                    <Skeleton className="h-4 w-96" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Profile Skeleton */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-6">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <Skeleton className="h-3 w-20 mb-1" />
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Skeleton */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-6">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                            <div>
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-5 w-48" />
                            </div>
                            <div>
                                <Skeleton className="h-3 w-32 mb-1" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 h-48">
                    <Skeleton className="h-6 w-64 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </main>
        </div>
    );
}
