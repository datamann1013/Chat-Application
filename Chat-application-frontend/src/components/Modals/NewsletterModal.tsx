import "./ModalStyles.css";

interface NewsletterModalProps {
    onClose: () => void;
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Newsletter Signup</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <form>
                        <input type="email" placeholder="Your Email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
