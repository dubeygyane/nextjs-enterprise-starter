import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })

    it('handles clicks', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('shows loading state', () => {
        render(<Button isLoading>Click me</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })
})
