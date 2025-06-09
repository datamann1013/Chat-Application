import React from 'react';
import AbstractModal from './AbstractModal';
import { FeedbackModalProps } from './types';
import { EmailValidation, RequiredTextValidation } from "./ValidationFields";
import { isValidEmail, isNotEmpty } from "../../utils/validation";
import { SuccessModal } from "./SuccessModal";
import { ErrorModal } from "./ErrorModal";

// Temporary array to store feedback until backend is ready
const tempFeedback: Array<{ feedback: string; userEmail: string }> = [];

export class FeedbackModal extends AbstractModal<FeedbackModalProps> {
    state = {
        email: '',
        feedback: '',
        showSuccessModal: false,
        showErrorModal: false,
        modalMessage: '',
    };

    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as never);
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email, feedback } = this.state;
        const errors: string[] = [];
        if (!isNotEmpty(email)) errors.push("Email is required.");
        else if (!isValidEmail(email)) errors.push("Invalid email format.");
        if (!isNotEmpty(feedback)) errors.push("Feedback is required.");
        if (errors.length > 0) {
            this.setState({ modalMessage: errors.join("\n"), showErrorModal: true });
            return;
        }
        // TEMP: Store feedback in tempFeedback
        tempFeedback.push({ feedback, userEmail: email });
        this.setState({ modalMessage: "Feedback sent! (TEMP: No backend yet)", showSuccessModal: true, email: '', feedback: '' });
        // TODO: Connect to backend for feedback submission
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <EmailValidation
                    value={this.state.email}
                    onChange={this.handleInputChange}
                />
                <RequiredTextValidation
                    name="feedback"
                    placeholder="Your feedback..."
                    value={this.state.feedback}
                    onChange={this.handleInputChange}
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
            <>
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
                            {this.renderContent()}
                        </div>
                    </dialog>
                </div>
                {this.state.showSuccessModal && !!this.state.modalMessage && (
                    <SuccessModal
                        isOpen={true}
                        onClose={() => this.setState({ showSuccessModal: false, modalMessage: '' })}
                        message={this.state.modalMessage}
                    />
                )}
                {this.state.showErrorModal && !!this.state.modalMessage && (
                    <ErrorModal
                        isOpen={true}
                        onClose={() => this.setState({ showErrorModal: false, modalMessage: '' })}
                        message={this.state.modalMessage}
                        onBack={() => this.setState({ showErrorModal: false, modalMessage: '' })}
                    />
                )}
            </>
        );
    }
}