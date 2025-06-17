import React, {useState} from 'react';
import {BaseModal} from './BaseModal';
import {FeedbackModalProps} from './types';
import {EmailValidation, RequiredTextValidation} from "./ValidationFields";
import {isNotEmpty, isValidEmail} from "../../utils/validation";
import {useFeedbackModal} from './useFeedbackModal';

// Temporary array to store feedback until backend is ready
const tempFeedback: Array<{ feedback: string; userEmail: string }> = [];

export function FeedbackModal({isOpen, onClose, onSubmit, className}: Readonly<FeedbackModalProps>) {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const {
        showSuccess,
        showError,
        feedbackModals,
    } = useFeedbackModal();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'feedback') setFeedback(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!isNotEmpty(email)) errors.push("Email is required.");
        else if (!isValidEmail(email)) errors.push("Invalid email format.");
        if (!isNotEmpty(feedback)) errors.push("Feedback is required.");
        if (errors.length > 0) {
            showError(errors.join("\n"));
            return;
        }
        // TEMP: Store feedback in tempFeedback
        tempFeedback.push({ feedback, userEmail: email });
        if (onSubmit) onSubmit(feedback);
        showSuccess("Feedback sent! (TEMP: No backend yet)");
        setEmail('');
        setFeedback('');
    };

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose} title="Feedback" className={className}>
                <form onSubmit={handleSubmit}>
                    <EmailValidation
                        value={email}
                        onChange={handleInputChange}
                    />
                    <RequiredTextValidation
                        name="feedback"
                        placeholder="Your feedback..."
                        value={feedback}
                        onChange={handleInputChange}
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
            </BaseModal>
            {feedbackModals}
        </>
    );
}