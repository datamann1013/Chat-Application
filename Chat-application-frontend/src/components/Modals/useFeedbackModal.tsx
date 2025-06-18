import {useState} from 'react';
import {SuccessModal} from './SuccessModal';
import {ErrorModal} from './ErrorModal';

export function useFeedbackModal() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const showSuccess = (message: string) => {
        setModalMessage(message);
        setShowSuccessModal(true);
    };
    const showError = (message: string) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };
    const closeSuccess = () => {
        setShowSuccessModal(false);
        setModalMessage('');
    };
    const closeError = () => {
        setShowErrorModal(false);
        setModalMessage('');
    };

    const feedbackModals = (
        <>
            {showSuccessModal && !!modalMessage && (
                <SuccessModal
                    isOpen={true}
                    onClose={closeSuccess}
                    message={modalMessage}
                />
            )}
            {showErrorModal && !!modalMessage && (
                <ErrorModal
                    isOpen={true}
                    onClose={closeError}
                    message={modalMessage}
                    onBack={closeError}
                />
            )}
        </>
    );

    return {
        showSuccess,
        showError,
        closeSuccess,
        closeError,
        feedbackModals,
        setModalMessage,
        modalMessage,
    };
}

