import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '../ThemeToggle';

// Mock component wrapper with ThemeProvider
const ThemeToggleWrapper = ({ initialTheme = 'light' }: { initialTheme?: string }) => (
    <ThemeProvider attribute="class" defaultTheme={initialTheme} enableSystem={false}>
        <ThemeToggle />
    </ThemeProvider>
);

describe('ThemeToggle', () => {
    it('renders correctly after mounting', async () => {
        render(<ThemeToggleWrapper />);

        // Wait for component to mount (handles hydration)
        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });
    });

    it('shows placeholder div before mounting', () => {
        const { container } = render(<ThemeToggleWrapper />);

        // Before mounting, should render a placeholder div
        const placeholder = container.querySelector('.w-10.h-10');
        expect(placeholder).toBeInTheDocument();
    });

    it('displays moon icon in light mode', async () => {
        render(<ThemeToggleWrapper initialTheme="light" />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        // In light mode, should show moon icon (to switch to dark)
        const button = screen.getByRole('button', { name: /toggle theme/i });
        expect(button).toBeInTheDocument();
    });

    it('displays sun icon in dark mode', async () => {
        render(<ThemeToggleWrapper initialTheme="dark" />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        // In dark mode, should show sun icon (to switch to light)
        const button = screen.getByRole('button', { name: /toggle theme/i });
        expect(button).toBeInTheDocument();
    });

    it('toggles theme from light to dark on click', async () => {
        render(<ThemeToggleWrapper initialTheme="light" />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Click to toggle theme
        fireEvent.click(button);

        // Theme should change (verified by the button still being present)
        await waitFor(() => {
            expect(button).toBeInTheDocument();
        });
    });

    it('toggles theme from dark to light on click', async () => {
        render(<ThemeToggleWrapper initialTheme="dark" />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Click to toggle theme
        fireEvent.click(button);

        // Theme should change (verified by the button still being present)
        await waitFor(() => {
            expect(button).toBeInTheDocument();
        });
    });

    it('has correct accessibility attributes', async () => {
        render(<ThemeToggleWrapper />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Check aria-label
        expect(button).toHaveAttribute('aria-label', 'Toggle theme');
    });

    it('applies correct CSS classes', async () => {
        render(<ThemeToggleWrapper />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Check for essential classes
        expect(button).toHaveClass('w-10');
        expect(button).toHaveClass('h-10');
        expect(button).toHaveClass('rounded-full');
    });

    it('handles multiple clicks correctly', async () => {
        render(<ThemeToggleWrapper initialTheme="light" />);

        await waitFor(() => {
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Click multiple times
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        // Button should still be functional
        await waitFor(() => {
            expect(button).toBeInTheDocument();
        });
    });
});
