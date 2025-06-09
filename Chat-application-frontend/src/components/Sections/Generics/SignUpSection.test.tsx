import { render, screen, fireEvent } from "@testing-library/react";
import SignUpSection from "./SignUpSection";

describe("SignUpSection", () => {
    const onNewsletterClick = jest.fn();
    const onFeedbackClick = jest.fn();
    const onRegisterClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders heading and description", () => {
        render(
            <SignUpSection
                onNewsletterClick={onNewsletterClick}
                onFeedbackClick={onFeedbackClick}
                onRegisterClick={onRegisterClick}
            />
        );
        expect(screen.getByText("Get Involved")).toBeInTheDocument();
        expect(screen.getByText("Stay updated, give feedback, or join our secure platform!")).toBeInTheDocument();
    });

    it("renders all buttons", () => {
        render(
            <SignUpSection
                onNewsletterClick={onNewsletterClick}
                onFeedbackClick={onFeedbackClick}
                onRegisterClick={onRegisterClick}
            />
        );
        expect(screen.getByText("Newsletter")).toBeInTheDocument();
        expect(screen.getByText("Feedback")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
    });

    it("calls onNewsletterClick when Newsletter button is clicked", () => {
        render(
            <SignUpSection
                onNewsletterClick={onNewsletterClick}
                onFeedbackClick={onFeedbackClick}
                onRegisterClick={onRegisterClick}
            />
        );
        fireEvent.click(screen.getByText("Newsletter"));
        expect(onNewsletterClick).toHaveBeenCalled();
    });

    it("calls onFeedbackClick when Feedback button is clicked", () => {
        render(
            <SignUpSection
                onNewsletterClick={onNewsletterClick}
                onFeedbackClick={onFeedbackClick}
                onRegisterClick={onRegisterClick}
            />
        );
        fireEvent.click(screen.getByText("Feedback"));
        expect(onFeedbackClick).toHaveBeenCalled();
    });

    it("calls onRegisterClick when Register button is clicked", () => {
        render(
            <SignUpSection
                onNewsletterClick={onNewsletterClick}
                onFeedbackClick={onFeedbackClick}
                onRegisterClick={onRegisterClick}
            />
        );
        fireEvent.click(screen.getByText("Register"));
        expect(onRegisterClick).toHaveBeenCalled();
    });
});
