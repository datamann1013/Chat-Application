import { BaseModalProps } from './types';
import errorIcon from '../../../public/icons/error.png'; // Place a red X image in assets

interface ErrorModalProps extends Omit<BaseModalProps, 'children'> {
    message: string;
    onBack: () => void;
    backLabel?: string;
}

export function ErrorModal({onClose, message, onBack, backLabel = 'Back', title = 'Error', className }: ErrorModalProps) {
    return (
        <div>
            <div className="modal-overlay" onClick={onClose}>
                <div className={`modal-content ${className || ''}`} onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={errorIcon} alt="Error" style={{ width: 48, height: 48 }} />
                        <span style={{ fontSize: 18 }}>{message}</span>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onBack} className="modal-submit">{backLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

