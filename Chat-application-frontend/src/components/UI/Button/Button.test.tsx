import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders children', () => {
        render(<Button aria-label="test">Click me</Button>);
        expect(screen.getByText(/click me/i)).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} aria-label="test">Click</Button>);
        fireEvent.click(screen.getByRole('button', { name: /test/i }));
        expect(handleClick).toHaveBeenCalled();
    });

    it('applies variant and size classes', () => {
        render(
            <Button variant="secondary" size="lg" aria-label="test">
                Variant
            </Button>
        );
        const btn = screen.getByRole('button', { name: /test/i });
        expect(btn.className).toMatch(/button--secondary/);
        expect(btn.className).toMatch(/button--lg/);
    });

    it('is disabled when disabled prop is true', () => {
        render(
            <Button disabled aria-label="test">
                Disabled
            </Button>
        );
        const btn = screen.getByRole('button', { name: /test/i });
        expect(btn).toBeDisabled();
    });

    it('sets the correct aria-label', () => {
        render(<Button aria-label="my-label">Label</Button>);
        expect(screen.getByRole('button', { name: /my-label/i })).toBeInTheDocument();
    });

    it('renders with type submit', () => {
        render(<Button type="submit" aria-label="submit">Submit</Button>);
        const btn = screen.getByRole('button', { name: /submit/i });
        expect(btn).toHaveAttribute('type', 'submit');
    });
});