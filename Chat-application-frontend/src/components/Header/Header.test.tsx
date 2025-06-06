import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('renders Header', () => {
    render(
        <MemoryRouter>
            <Header onLoginClick={jest.fn()} />
        </MemoryRouter>
    );
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
});