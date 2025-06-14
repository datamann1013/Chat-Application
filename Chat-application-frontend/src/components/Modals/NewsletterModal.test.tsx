import { render, screen, fireEvent } from "@testing-library/react";
import { NewsletterModal } from "./NewsletterModal";

// Provide a dummy children prop to satisfy the AbstractModal/BaseModal contract
const DummyChildren = <div />;

describe("NewsletterModal", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders email input and subscribe button with correct attributes", () => {
        render(
            <NewsletterModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Newsletter"
                children={DummyChildren}
            />
        );
        const input = screen.getByPlaceholderText("Your Email");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "email");
        expect(input).toHaveAttribute("name", "email");
        expect(input).toHaveAttribute("required");
        expect(input).toHaveClass("modal-input");
        expect(screen.getByText("Subscribe")).toBeInTheDocument();
    });

    it("calls onSubmit with email on submit", () => {
        render(
            <NewsletterModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Newsletter"
                children={DummyChildren}
            />
        );
        fireEvent.change(screen.getByPlaceholderText("Your Email"), {
            target: { value: "test@example.com" }
        });
        const form = screen.getByText("Subscribe").closest("form");
        fireEvent.submit(form!);
        expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    });

    it("calls onClose on Escape key", () => {
        render(
            <NewsletterModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Newsletter"
                children={DummyChildren}
            />
        );
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalled();
    });
});
