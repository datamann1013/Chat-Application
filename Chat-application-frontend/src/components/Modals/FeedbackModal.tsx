import "./ModalStyles.css";

interface FeedbackModalProps {
    onClose: () => void;
}

export default function FeedbackModal({ onClose }: FeedbackModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Feedback</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <form>
                        <textarea placeholder="Your feedback..." rows={5} />
                        <button type="submit">Send Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
