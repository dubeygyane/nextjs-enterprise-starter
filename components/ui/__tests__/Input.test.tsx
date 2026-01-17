import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
    describe('Basic Rendering', () => {
        it('renders correctly without props', () => {
            render(<Input />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });

        it('renders with label', () => {
            render(<Input label="Email" />);
            const label = screen.getByText('Email');
            const input = screen.getByRole('textbox');

            expect(label).toBeInTheDocument();
            expect(input).toBeInTheDocument();
            expect(label).toHaveAttribute('for', 'input-email');
        });

        it('renders with custom id', () => {
            render(<Input id="custom-id" label="Username" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('id', 'custom-id');
        });

        it('generates id from label when id is not provided', () => {
            render(<Input label="First Name" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('id', 'input-first-name');
        });

        it('applies custom className', () => {
            render(<Input className="custom-class" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveClass('custom-class');
        });
    });

    describe('Input Types', () => {
        it('renders text input by default', () => {
            render(<Input />);
            const input = screen.getByRole('textbox');

            // Input should be rendered and accessible as textbox
            expect(input).toBeInTheDocument();
        });

        it('renders email input', () => {
            render(<Input type="email" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('type', 'email');
        });

        it('renders password input', () => {
            render(<Input type="password" label="Password" />);
            const input = screen.getByLabelText('Password');

            expect(input).toHaveAttribute('type', 'password');
        });

        it('renders number input', () => {
            render(<Input type="number" />);
            const input = screen.getByRole('spinbutton');

            expect(input).toHaveAttribute('type', 'number');
        });
    });

    describe('Password Visibility Toggle', () => {
        it('shows password toggle button for password input', () => {
            render(<Input type="password" label="Password" />);
            const toggleButton = screen.getByRole('button', { name: /show password/i });

            expect(toggleButton).toBeInTheDocument();
        });

        it('does not show toggle button for non-password inputs', () => {
            render(<Input type="text" label="Username" />);
            const toggleButton = screen.queryByRole('button', { name: /show password/i });

            expect(toggleButton).not.toBeInTheDocument();
        });

        it('toggles password visibility on button click', () => {
            render(<Input type="password" label="Password" />);
            const input = screen.getByLabelText('Password');
            const toggleButton = screen.getByRole('button', { name: /show password/i });

            // Initially password type
            expect(input).toHaveAttribute('type', 'password');

            // Click to show password
            fireEvent.click(toggleButton);
            expect(input).toHaveAttribute('type', 'text');
            expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

            // Click to hide password
            fireEvent.click(toggleButton);
            expect(input).toHaveAttribute('type', 'password');
            expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
        });

        it('has correct aria-label for password toggle', () => {
            render(<Input type="password" label="Password" />);
            const toggleButton = screen.getByRole('button', { name: /show password/i });

            expect(toggleButton).toHaveAttribute('aria-label', 'Show password');

            fireEvent.click(toggleButton);
            expect(toggleButton).toHaveAttribute('aria-label', 'Hide password');
        });
    });

    describe('Error Handling', () => {
        it('displays error message', () => {
            render(<Input label="Email" error="Email is required" />);
            const errorMessage = screen.getByRole('alert');

            expect(errorMessage).toBeInTheDocument();
            expect(errorMessage).toHaveTextContent('Email is required');
        });

        it('applies error styles when error is present', () => {
            render(<Input label="Email" error="Invalid email" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveClass('border-red-500');
            expect(input).toHaveAttribute('aria-invalid', 'true');
        });

        it('links error message to input with aria-describedby', () => {
            render(<Input id="email-input" label="Email" error="Invalid email" />);
            const input = screen.getByRole('textbox');
            const errorMessage = screen.getByRole('alert');

            expect(input).toHaveAttribute('aria-describedby', 'email-input-error');
            expect(errorMessage).toHaveAttribute('id', 'email-input-error');
        });

        it('does not show error message when error is not provided', () => {
            render(<Input label="Email" />);
            const errorMessage = screen.queryByRole('alert');

            expect(errorMessage).not.toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has correct aria-invalid attribute', () => {
            const { rerender } = render(<Input label="Email" />);
            let input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('aria-invalid', 'false');

            rerender(<Input label="Email" error="Invalid email" />);
            input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('aria-invalid', 'true');
        });

        it('associates label with input correctly', () => {
            render(<Input label="Username" />);
            const label = screen.getByText('Username');
            const input = screen.getByRole('textbox');

            expect(label).toHaveAttribute('for', input.getAttribute('id'));
        });
    });

    describe('User Interactions', () => {
        it('handles onChange event', () => {
            const handleChange = jest.fn();
            render(<Input onChange={handleChange} />);
            const input = screen.getByRole('textbox');

            fireEvent.change(input, { target: { value: 'test value' } });

            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it('handles onFocus event', () => {
            const handleFocus = jest.fn();
            render(<Input onFocus={handleFocus} />);
            const input = screen.getByRole('textbox');

            fireEvent.focus(input);

            expect(handleFocus).toHaveBeenCalledTimes(1);
        });

        it('handles onBlur event', () => {
            const handleBlur = jest.fn();
            render(<Input onBlur={handleBlur} />);
            const input = screen.getByRole('textbox');

            fireEvent.blur(input);

            expect(handleBlur).toHaveBeenCalledTimes(1);
        });

        it('accepts user input', () => {
            render(<Input />);
            const input = screen.getByRole('textbox') as HTMLInputElement;

            fireEvent.change(input, { target: { value: 'Hello World' } });

            expect(input.value).toBe('Hello World');
        });
    });

    describe('Disabled State', () => {
        it('renders disabled input', () => {
            render(<Input disabled />);
            const input = screen.getByRole('textbox');

            expect(input).toBeDisabled();
        });

        it('applies disabled styles', () => {
            render(<Input disabled />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveClass('disabled:bg-gray-100');
            expect(input).toHaveClass('disabled:cursor-not-allowed');
        });
    });

    describe('Placeholder', () => {
        it('renders with placeholder text', () => {
            render(<Input placeholder="Enter your email" />);
            const input = screen.getByPlaceholderText('Enter your email');

            expect(input).toBeInTheDocument();
        });
    });

    describe('ForwardRef', () => {
        it('forwards ref correctly', () => {
            const ref = { current: null as HTMLInputElement | null };
            render(<Input ref={ref} />);

            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });

        it('allows ref to access input methods', () => {
            const ref = { current: null as HTMLInputElement | null };
            render(<Input ref={ref} />);

            expect(ref.current?.focus).toBeDefined();
            expect(ref.current?.blur).toBeDefined();
        });
    });

    describe('Additional HTML Attributes', () => {
        it('accepts and applies additional HTML attributes', () => {
            render(<Input name="email" required maxLength={50} />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('name', 'email');
            expect(input).toHaveAttribute('required');
            expect(input).toHaveAttribute('maxLength', '50');
        });

        it('accepts autoComplete attribute', () => {
            render(<Input autoComplete="email" />);
            const input = screen.getByRole('textbox');

            expect(input).toHaveAttribute('autoComplete', 'email');
        });
    });
});
