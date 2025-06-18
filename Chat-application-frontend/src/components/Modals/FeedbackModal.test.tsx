import { render, screen, fireEvent } from "@testing-library/react";
import { FeedbackModal } from "./FeedbackModal";

describe("FeedbackModal", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders textarea and submit button", () => {
        render(
            <FeedbackModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Feedback"
            >
            <div />
            </FeedbackModal>
        );
        expect(screen.getByPlaceholderText("Your feedback...")).toBeInTheDocument();
        expect(screen.getByText("Send Feedback")).toBeInTheDocument();
    });

    it("calls onSubmit with feedback on submit", () => {
        render(
            <FeedbackModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Feedback"
            >
            <div />
            </FeedbackModal>
        );
        fireEvent.change(screen.getByPlaceholderText("Your Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Your feedback..."), { target: { value: "Great app!" } });
        const form = screen.getByText("Send Feedback").closest("form");
        fireEvent.submit(form!);
        expect(onSubmit).toHaveBeenCalledWith("Great app!");
    });

    it("calls onClose on Escape key", () => {
        render(
            <FeedbackModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Feedback"
            >
            <div />
            </FeedbackModal>
        );
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalled();
    });
});
