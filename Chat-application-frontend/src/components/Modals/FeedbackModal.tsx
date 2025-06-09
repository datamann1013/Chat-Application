import React from 'react';
import AbstractModal from './AbstractModal';
import { FeedbackModalProps } from './types';
import { InputField } from '../UI/InputField/InputField';

export class FeedbackModal extends AbstractModal<FeedbackModalProps> {
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Only pass feedback string, as expected by onSubmit
        const feedback = formData.get('feedback') as string;
        if (this.props.onSubmit) {
            this.props.onSubmit(feedback);
        }
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="modal-input"
                    fullModalWidth
                />
                <textarea
                    name="feedback"
                    placeholder="Your feedback..."
                    rows={5}
                    required
                    className="modal-largetextinput"
                    style={{ width: "100%" }}
                    tabIndex={0}
                    aria-label="Feedback"
                    onKeyDown={e => {
                        // Allow Enter for newlines, but prevent tab from leaving if needed
                        if (e.key === "Tab" && !e.shiftKey) {
                            e.preventDefault();
                        }
                    }}
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
                tabIndex={0} // Make overlay focusable for keyboard events
            >
                <dialog
                    className={`modal-content ${(this.props.className ?? '')}`}
                    onClick={e => e.stopPropagation()}
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
        );
    }
}