'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeSlash } from './Icons';

/**
 * Reusable Input Component
 * Fully compatible with React Hook Form
 * Supports labels, errors, and accessibility features
 * Includes show/hide password functionality
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        // Generate unique ID if not provided
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        id={inputId}
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        className={`
                            w-full px-4 py-2.5 
                            border rounded-lg 
                            bg-white dark:bg-gray-900
                            text-gray-900 dark:text-white
                            placeholder-gray-400 dark:placeholder-gray-500
                            transition-all duration-200
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-blue-500 
                            focus:border-transparent
                            disabled:bg-gray-100 dark:disabled:bg-gray-800
                            disabled:cursor-not-allowed
                            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
                            ${isPassword ? 'pr-10' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeSlash className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="mt-1.5 text-sm text-red-600"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
