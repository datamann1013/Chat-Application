import React from 'react';
import AbstractModal from './AbstractModal';
import { FeedbackModalProps } from './types';

export class FeedbackModal extends AbstractModal<FeedbackModalProps> {
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const feedback = formData.get('feedback') as string;

        if (this.props.onSubmit) {
            this.props.onSubmit(feedback);
        }
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea
                    name="feedback"
                    placeholder="Your feedback..."
                    rows={5}
                    required
                    className="modal-largetextinput"
                    style={{ width: "100%" }}
                />
                <button type="submit" className="modal-submit">
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
                onClick={e => {
                    if (e.target === e.currentTarget) this.props.onClose();
                }}
            >
                <div
                    className={`modal-content ${this.props.className || ''}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>Feedback</h2>
                        <button
                            className="close-btn"
                            onClick={this.props.onClose}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}