// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BaseModalProps } from './types';
import checkmark from '../../icons/success.png'; // Place a green checkmark image in assets

interface SuccessModalProps extends Omit<BaseModalProps, 'children'> {
    message: string;
}

export function SuccessModal({onClose, message, title = 'Success', className }: SuccessModalProps) {
    return (
        <div>
            <div className="modal-overlay" onClick={onClose}>
                <div className={`modal-content ${className || ''}`} onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={checkmark} alt="Success" style={{ width: 48, height: 48 }} />
                        <span style={{ fontSize: 18 }}>{message}</span>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} className="modal-submit">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

