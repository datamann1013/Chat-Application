import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
    const onLoginClick = jest.fn();

    beforeEach(() => {
        onLoginClick.mockClear();
    });

    test('renders logo and login button', () => {
        render(
            <MemoryRouter>
                <Header onLoginClick={onLoginClick} />
            </MemoryRouter>
        );
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
        expect(screen.getByText(/log in/i)).toBeInTheDocument();
    });

    test('calls onLoginClick when login button is clicked', () => {
        render(
            <MemoryRouter>
                <Header onLoginClick={onLoginClick} />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText(/log in/i));
        expect(onLoginClick).toHaveBeenCalledTimes(1);
    });

    test('shows current page title based on location', () => {
        render(
            <MemoryRouter initialEntries={['/chat']}>
                <Header onLoginClick={onLoginClick} />
            </MemoryRouter>
        );
        expect(screen.getByText(/chat/i)).toBeInTheDocument();
    });

    test('opens and closes dropdown menu', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header onLoginClick={jest.fn()} />
            </MemoryRouter>
        );

        // Menu should be closed initially
        expect(document.querySelectorAll('.dropdown-menu').length).toBe(0);

        // Open the menu
        const button = screen.getByLabelText('Current Page');
        fireEvent.click(button);

        // Menu should be open (1 dropdown-menu)
        expect(document.querySelectorAll('.dropdown-menu').length).toBe(1);
    });

    test('shows section preview on nav item hover', () => {
        render(
            <MemoryRouter>
                <Header onLoginClick={onLoginClick} />
            </MemoryRouter>
        );
        // Open the dropdown
        fireEvent.click(screen.getByRole('button', { name: /current page/i }));

        // Hover over the "Landing" nav item (role is 'menuitem', not 'button')
        const landingNav = screen.getByRole('menuitem', {name: /landing/i});
        fireEvent.mouseEnter(landingNav);

        // Now section links should appear
        expect(screen.getByText("Why Choose Our Platform?")).toBeInTheDocument();
        expect(screen.getByText("Meet the Team")).toBeInTheDocument();
        expect(screen.getByText("Roadmap")).toBeInTheDocument();
    });

    test('dropdown closes when section link is clicked', () => {
        render(
            <MemoryRouter>
                <Header onLoginClick={onLoginClick} />
            </MemoryRouter>
        );
        const toggle = screen.getByRole('button', { name: /current page/i });
        fireEvent.click(toggle);

        // Hover to show sections
        const landingButton = screen.getByRole('menuitem', {name: /landing/i});
        fireEvent.mouseEnter(landingButton);

        // Click a section link
        const sectionLink = screen.getByText("Why Choose Our Platform?");
        fireEvent.click(sectionLink);

        // Dropdown should close
        expect(screen.queryByText("Why Choose Our Platform?")).not.toBeInTheDocument();
    });
});