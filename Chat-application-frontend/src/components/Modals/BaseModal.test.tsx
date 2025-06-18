import { render, screen, fireEvent } from "@testing-library/react";
import { BaseModal } from "./BaseModal";

describe("BaseModal", () => {
    const onClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("does not render when isOpen is false", () => {
        const { container } = render(
            <BaseModal isOpen={false} onClose={onClose}>
                <div>Test Content</div>
            </BaseModal>
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders children when open", () => {
        render(
            <BaseModal isOpen={true} onClose={onClose}>
                <div>Test Content</div>
            </BaseModal>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders title if provided", () => {
        render(
            <BaseModal isOpen={true} onClose={onClose} title="My Modal">
                <div>Test Content</div>
            </BaseModal>
        );
        expect(screen.getByText("My Modal")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        render(
            <BaseModal isOpen={true} onClose={onClose}>
                <div>Test Content</div>
            </BaseModal>
        );
        fireEvent.click(screen.getByText("×"));
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onClose when overlay is clicked", () => {
        render(
            <BaseModal isOpen={true} onClose={onClose}>
                <div>Test Content</div>
            </BaseModal>
        );
        const overlay = screen.getByText("Test Content").closest(".modal-overlay")!;
        fireEvent.mouseDown(overlay);
        fireEvent.mouseUp(overlay);
        expect(onClose).toHaveBeenCalled();
    });
});