import React, {useState} from 'react';
import {BaseModal} from './BaseModal';
import {NewsletterModalProps} from './types';
import {EmailValidation} from './ValidationFields';
import {isNotEmpty, isValidEmail} from '../../utils/validation';
import {useFeedbackModal} from './useFeedbackModal';

const tempNewsletter: Array<{ email: string }> = [];

export function NewsletterModal({isOpen, onClose, onSubmit, className}: NewsletterModalProps) {
    const [email, setEmail] = useState('');
    const {
        showSuccess,
        showError,
        feedbackModals,
    } = useFeedbackModal();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!isNotEmpty(email)) errors.push('Email is required.');
        else if (!isValidEmail(email)) errors.push('Invalid email format.');
        if (errors.length > 0) {
            showError(errors.join("\n"));
            return;
        }
        tempNewsletter.push({ email });
        if (onSubmit) onSubmit(email);
        showSuccess('Subscribed! (TEMP: No backend yet)');
        setEmail('');
    };

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose} title="Newsletter" className={className}>
                <form onSubmit={handleSubmit}>
                    <EmailValidation
                        value={email}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="modal-submit">
                        Subscribe
                    </button>
                </form>
            </BaseModal>
            {feedbackModals}
        </>
    );
}