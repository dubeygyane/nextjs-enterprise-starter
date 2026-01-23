import Button from '@/components/ui/Button';
import { WarningIcon } from '@/components/ui/Icons';
import { ReactNode } from 'react';

interface ErrorStateProps {
    title?: string;
    message?: string;
    retryLabel?: string;
    onRetry?: () => void;
    children?: ReactNode;
}

export function ErrorState({
    title = 'Something went wrong',
    message,
    retryLabel = 'Try Again',
    onRetry,
    children
}: ErrorStateProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                    <WarningIcon className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h2>
                {message && (
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {message}
                    </p>
                )}
                <div className="flex gap-3 justify-center">
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            variant="primary"
                        >
                            {retryLabel}
                        </Button>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
