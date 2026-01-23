'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ApiAxiosError, LoginCredentials } from '@/types/auth';
import { useLoginMutation } from '@/hooks/auth/useLoginMutation';
import { loginSchema } from '@/lib/schemas/auth';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/**
 * Login Page Component
 * Handles user authentication with React Hook Form validation using Zod
 * Uses custom useLoginMutation hook for login logic
 *
 * Note: Middleware redirects authenticated users to /dashboard automatically
 */

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        defaultValues: {
            email: 'user@example.com',
            password: 'password123',
        },
    });

    const loginMutation = useLoginMutation();

    const onSubmit = (data: LoginCredentials) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 px-4 transition-colors duration-300">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
                            Demo Credentials:
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            Email: user@example.com
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            Password: password123
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        {loginMutation.isError && (
                            <div
                                className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg"
                                role="alert"
                            >
                                <p className="text-sm text-red-800 dark:text-red-200">
                                    {(loginMutation.error as ApiAxiosError)?.response?.data?.error ||
                                        loginMutation.error?.message ||
                                        'Invalid email or password.'}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={loginMutation.isPending}
                            className="w-full"
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
                    Secure authentication with Next.js
                </p>
            </div>
        </div>
    );
}
