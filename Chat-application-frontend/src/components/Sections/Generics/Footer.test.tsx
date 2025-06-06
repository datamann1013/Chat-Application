import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    test('renders main footer element', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    test('renders all footer columns', () => {
        render(<Footer />);

        expect(screen.getByText(/company/i)).toBeInTheDocument();
        expect(screen.getByText(/support/i)).toBeInTheDocument();
        expect(screen.getByText(/legal/i)).toBeInTheDocument();
    });

    test('renders links in the footer', () => {
        render(<Footer />);
        // Example: check for a known link (adjust as needed)
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
    });

    test('shows copyright', () => {
        render(<Footer />);
        expect(screen.getByText((content) => content.includes('©'))).toBeInTheDocument();
    });
});