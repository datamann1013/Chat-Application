import "./SignUpSection.css";
import { Button } from '../../UI/Button/Button.tsx'
import { useState } from 'react';
import {NewsletterModal} from '../../Modals/NewsletterModal';
import LoginModal from '../../Modals/LoginModal';
import {FeedbackModal} from '../../Modals/FeedbackModal';

interface SignUpSectionProps {
    onNewsletterClick: () => void;
    onFeedbackClick: () => void;
    onRegisterClick: () => void;
}

export default function SignUpSection({
                                          onNewsletterClick,
                                          onFeedbackClick,
                                          onRegisterClick,
                                      }: SignUpSectionProps) {
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleNewsletterClick = () => {
        setNewsletterOpen(true);
        onNewsletterClick();
    };

    const handleFeedbackClick = () => {
        setFeedbackOpen(true);
        onFeedbackClick();
    };

    const handleRegisterClick = () => {
        setLoginOpen(true);
        onRegisterClick();
    };

    return (
        <div className="signup-section">
            <h2>Get Involved</h2>
            <p>Stay updated, give feedback, or join our secure platform!</p>
            <div className="signup-buttons">
                <Button onClick={handleNewsletterClick} variant="default" size="lg">
                    Newsletter
                </Button>
                <Button onClick={handleFeedbackClick} variant="default" size="lg">
                    Feedback
                </Button>
                <Button onClick={handleRegisterClick} variant="default" size="lg">
                    Register
                </Button>
            </div>

            {newsletterOpen && (
                <NewsletterModal
                    onClose={() => setNewsletterOpen(false)}
                    onSubmit={(email: string) => {
                        console.log('Newsletter submitted:', email);
                        setNewsletterOpen(false);
                    }} isOpen={false} children={undefined}                />
            )}

            {feedbackOpen && (
                <FeedbackModal
                    onClose={() => setFeedbackOpen(false)}
                    onSubmit={(feedback: string) => {
                        console.log('Feedback submitted:', feedback);
                        setFeedbackOpen(false);
                    }} isOpen={false} children={undefined}                />
            )}

            {loginOpen && (
                <LoginModal
                    onClose={() => setLoginOpen(false)}
                />
            )}
        </div>
    );
}