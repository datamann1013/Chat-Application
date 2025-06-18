import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField.tsx';

describe('InputField', () => {
    it('renders with placeholder', () => {
        render(<InputField placeholder="Type here" />);
        expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
    });

    it('calls onChange when typing', () => {
        const handleChange = jest.fn();
        render(<InputField placeholder="Type" onChange={handleChange} />);
        fireEvent.change(screen.getByPlaceholderText("Type"), { target: { value: "abc" } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('applies size and variant classes', () => {
        render(<InputField size="lg" variant="secondary" placeholder="Big" />);
        const input = screen.getByPlaceholderText("Big");
        expect(input.className).toMatch(/inputfield--lg/);
        expect(input.className).toMatch(/inputfield--secondary/);
    });

    it('applies full modal width class', () => {
        render(<InputField fullModalWidth placeholder="Full" />);
        const input = screen.getByPlaceholderText("Full");
        expect(input.className).toMatch(/inputfield--full-modal-width/);
    });

    it('is disabled when disabled prop is true', () => {
        render(<InputField disabled placeholder="Disabled" />);
        expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });

    it('passes value and type props', () => {
        render(<InputField value="abc" type="password" readOnly />);
        const input = screen.getByDisplayValue("abc");
        expect(input).toHaveAttribute('type', 'password');
    });
});
