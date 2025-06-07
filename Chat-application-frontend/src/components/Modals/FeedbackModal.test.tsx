import React from "react";
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
            />
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
            />
        );
        fireEvent.change(screen.getByPlaceholderText("Your feedback..."), {
            target: { value: "Great app!" }
        });
        fireEvent.click(screen.getByText("Send Feedback"));
        expect(onSubmit).toHaveBeenCalledWith("Great app!");
    });

    it("calls onClose on Escape key", () => {
        render(
            <FeedbackModal
                isOpen={true}
                onClose={onClose}
                onSubmit={onSubmit}
                title="Feedback"
            />
        );
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalled();
    });
});
