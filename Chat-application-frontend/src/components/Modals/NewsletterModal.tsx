import React from 'react';
import AbstractModal from './AbstractModal';
import { NewsletterModalProps } from './types';
import { EmailValidation } from './ValidationFields';
import { isValidEmail, isNotEmpty } from '../../utils/validation';

// Temporary array to store newsletter signups until backend is ready
const tempNewsletter: Array<{ email: string }> = [];

export class NewsletterModal extends AbstractModal<NewsletterModalProps> {
    state = {
        error: null as string | null,
        success: null as string | null,
        email: '',
        fieldErrors: {} as { [key: string]: string }
    };

    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as never);
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email } = this.state;
        const errors: { [key: string]: string } = {};
        if (!isNotEmpty(email)) errors.email = 'Email is required.';
        else if (!isValidEmail(email)) errors.email = 'Invalid email format.';
        this.setState({ fieldErrors: errors });
        if (Object.keys(errors).length > 0) {
            this.setState({ error: 'Please fix the errors below.', success: null });
            return;
        }
        // TEMP: Store newsletter signup in tempNewsletter
        tempNewsletter.push({ email });
        this.setState({ success: 'Subscribed! (TEMP: No backend yet)', error: null, email: '', fieldErrors: {} });
        // TODO: Connect to backend for newsletter signup
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <EmailValidation
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    error={this.state.fieldErrors.email}
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
                role="presentation"
                aria-hidden={!this.props.isOpen}
                onClick={e => {
                    if (e.target === e.currentTarget) this.props.onClose();
                }}
                tabIndex={-1}
            >
                <dialog
                    className={`modal-content ${this.props.className ?? ''}`}
                    open
                    aria-modal="true"
                    aria-labelledby="newsletter-modal-title"
                >
                    <div className="modal-header">
                        <h2 id="newsletter-modal-title">Newsletter</h2>
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