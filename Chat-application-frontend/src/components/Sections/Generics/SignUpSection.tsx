import "./SignUpSection.css";

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
                <button onClick={onNewsletterClick}>Newsletter</button>
                <button onClick={onFeedbackClick}>Feedback</button>
                <button onClick={onRegisterClick}>Register</button>
            </div>
        </div>
    );
}
