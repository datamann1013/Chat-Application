import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AbstractModal from "./AbstractModal";

// Dummy props and implementation for testing
const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Test Modal",
    className: "test-class"
};

class TestModal extends AbstractModal<typeof defaultProps> {
    protected renderContent(): React.ReactNode {
        return <div>Modal Content</div>;
    }
}

describe("AbstractModal", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("does not render when isOpen is false", () => {
        const { container } = render(
            <TestModal {...defaultProps} isOpen={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders content and title when open", () => {
        render(<TestModal {...defaultProps} />);
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("calls onClose when overlay is clicked", () => {
        render(<TestModal {...defaultProps} />);
        fireEvent.click(screen.getByText("Modal Content").closest(".modal-overlay")!);
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("calls onClose when close button is clicked", () => {
        render(<TestModal {...defaultProps} />);
        fireEvent.click(screen.getByText("×"));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("calls onClose when Escape key is pressed", () => {
        render(<TestModal {...defaultProps} />);
        fireEvent.keyDown(document, { key: "Escape" });
        expect(defaultProps.onClose).toHaveBeenCalled();
    });
});
