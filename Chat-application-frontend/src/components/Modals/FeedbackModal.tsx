import React from 'react';
import AbstractModal from './AbstractModal';
import { FeedbackModalProps } from './types';
import { EmailValidation, RequiredTextValidation } from "./ValidationFields";
import { isValidEmail, isNotEmpty } from "../../utils/validation";

// Temporary array to store feedback until backend is ready
const tempFeedback: Array<{ feedback: string; userEmail: string }> = [];

export class FeedbackModal extends AbstractModal<FeedbackModalProps> {
    state = {
        error: null as string | null,
        success: null as string | null,
        email: '',
        feedback: '',
        fieldErrors: {} as { [key: string]: string }
    };

    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as never);
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email, feedback } = this.state;
        const errors: { [key: string]: string } = {};
        if (!isNotEmpty(email)) errors.email = "Email is required.";
        else if (!isValidEmail(email)) errors.email = "Invalid email format.";
        if (!isNotEmpty(feedback)) errors.feedback = "Feedback is required.";
        this.setState({ fieldErrors: errors });
        if (Object.keys(errors).length > 0) {
            this.setState({ error: "Please fix the errors below.", success: null });
            return;
        }
        // TEMP: Store feedback in tempFeedback
        tempFeedback.push({ feedback, userEmail: email });
        this.setState({ success: "Feedback sent! (TEMP: No backend yet)", error: null, email: '', feedback: '', fieldErrors: {} });
        // TODO: Connect to backend for feedback submission
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <EmailValidation
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    error={this.state.fieldErrors.email}
                />
                <RequiredTextValidation
                    name="feedback"
                    placeholder="Your feedback..."
                    value={this.state.feedback}
                    onChange={this.handleInputChange}
                    error={this.state.fieldErrors.feedback}
                    textarea
                />
                <button
                    type="submit"
                    className="modal-submit"
                    aria-label="Send Feedback"
                >
                    Send Feedback
                </button>
            </form>
        );
    }

    render() {
        if (!this.props.isOpen) return null;
        return (
            <div
                className="modal-overlay"
                role="presentation"
                aria-hidden={!this.props.isOpen}
                onClick={e => {
                    if (e.target === e.currentTarget) this.props.onClose();
                }}
                onKeyDown={e => {
                    if (e.target === e.currentTarget && e.key === 'Escape') {
                        this.props.onClose();
                    }
                }}
            >
                <dialog
                    className={`modal-content ${(this.props.className ?? '')}`}
                    open
                    aria-modal="true"
                    aria-labelledby="feedback-modal-title"
                >
                    <div className="modal-header">
                        <h2 id="feedback-modal-title">Feedback</h2>
                        <button
                            className="close-btn"
                            onClick={this.props.onClose}
                            aria-label="Close"
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.error && <div style={{ color: 'red', marginBottom: 8 }}>{this.state.error}</div>}
                        {this.state.success && <div style={{ color: 'green', marginBottom: 8 }}>{this.state.success}</div>}
                        {this.renderContent()}
                    </div>
                </dialog>
            </div>
        );
    }
}