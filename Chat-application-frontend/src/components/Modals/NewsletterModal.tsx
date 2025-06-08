import React from 'react';
import AbstractModal from './AbstractModal';
import { NewsletterModalProps } from './types';
import { InputField } from '../UI/InputField/InputField';

export class NewsletterModal extends AbstractModal<NewsletterModalProps> {
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        if (this.props.onSubmit) {
            this.props.onSubmit(email);
        }
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="modal-input"
                    fullModalWidth
                />
                <button type="submit" className="modal-submit">
                    Subscribe
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
                role="presentation"
                tabIndex={-1}
                onKeyDown={e => {
                    if (e.key === 'Escape') {
                        this.props.onClose();
                    }
                }}
            >
                <dialog
                    className={`modal-content ${this.props.className ?? ''}`}
                    onClick={e => e.stopPropagation()}
                    tabIndex={-1}
                    open
                >
                    <div className="modal-header">
                        <h2>Newsletter</h2>
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
                </dialog>
            </div>
        );
    }
}