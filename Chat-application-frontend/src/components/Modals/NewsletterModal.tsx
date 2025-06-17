import React, {useState} from 'react';
import {BaseModal} from './BaseModal';
import {NewsletterModalProps} from './types';
import {EmailValidation} from './ValidationFields';
import {isNotEmpty, isValidEmail} from '../../utils/validation';
import {SuccessModal} from './SuccessModal';
import {ErrorModal} from './ErrorModal';

const tempNewsletter: Array<{ email: string }> = [];

export function NewsletterModal({isOpen, onClose, onSubmit, className}: NewsletterModalProps) {
    const [email, setEmail] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!isNotEmpty(email)) errors.push('Email is required.');
        else if (!isValidEmail(email)) errors.push('Invalid email format.');
        if (errors.length > 0) {
            setModalMessage(errors.join("\n"));
            setShowErrorModal(true);
            return;
        }
        tempNewsletter.push({ email });
        if (onSubmit) onSubmit(email);
        setModalMessage('Subscribed! (TEMP: No backend yet)');
        setShowSuccessModal(true);
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
            {showSuccessModal && !!modalMessage && (
                <SuccessModal
                    isOpen={true}
                    onClose={() => {
                        setShowSuccessModal(false);
                        setModalMessage('');
                    }}
                    message={modalMessage}
                />
            )}
            {showErrorModal && !!modalMessage && (
                <ErrorModal
                    isOpen={true}
                    onClose={() => {
                        setShowErrorModal(false);
                        setModalMessage('');
                    }}
                    message={modalMessage}
                    onBack={() => {
                        setShowErrorModal(false);
                        setModalMessage('');
                    }}
                />
            )}
        </>
    );
}