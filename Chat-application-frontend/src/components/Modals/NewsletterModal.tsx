import React from 'react';
import AbstractModal from './AbstractModal';
import {NewsletterModalProps} from './types';
import {EmailValidation} from './ValidationFields';
import {isNotEmpty, isValidEmail} from '../../utils/validation';
import {SuccessModal} from "./SuccessModal";
import {ErrorModal} from "./ErrorModal";

// Temporary array to store newsletter signups until backend is ready
const tempNewsletter: Array<{ email: string }> = [];

export class NewsletterModal extends AbstractModal<NewsletterModalProps> {
    state = {
        email: '',
        showSuccessModal: false,
        showErrorModal: false,
        modalMessage: '',
    };

    private readonly handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as never);
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email } = this.state;
        const errors: string[] = [];
        if (!isNotEmpty(email)) errors.push('Email is required.');
        else if (!isValidEmail(email)) errors.push('Invalid email format.');
        if (errors.length > 0) {
            this.setState({ modalMessage: errors.join("\n"), showErrorModal: true });
            return;
        }
        // TEMP: Store newsletter signup in tempNewsletter
        tempNewsletter.push({ email });
        if (this.props.onSubmit) {
            this.props.onSubmit(email);
        }
        this.setState({ modalMessage: 'Subscribed! (TEMP: No backend yet)', showSuccessModal: true, email: '' });
        // TODO: Connect to backend for newsletter signup
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <EmailValidation
                    value={this.state.email}
                    onChange={this.handleInputChange}
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
            <>
                <div
                    className="modal-overlay"
                    role="presentation"
                    aria-hidden={!this.props.isOpen}
                    onClick={e => {
                        if (e.target === e.currentTarget) this.props.onClose();
                    }}
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