import "./SignUpSection.css";
import { Button } from '../../UI/Button/Button.tsx'

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
    return (
        <div className="signup-section">
            <h2>Get Involved</h2>
            <p>Stay updated, give feedback, or join our secure platform!</p>
            <div className="signup-buttons">
                <Button onClick={onNewsletterClick} variant="default" size="lg">
                    Newsletter
                </Button>
                <Button onClick={onFeedbackClick} variant="default" size="lg">
                    Feedback
                </Button>
                <Button onClick={onRegisterClick} variant="default" size="lg">
                    Register
                </Button>
            </div>
        </div>
    );
}
