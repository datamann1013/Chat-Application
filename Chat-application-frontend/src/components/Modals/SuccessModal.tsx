// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {BaseModalProps} from './Types';
import checkmark from '../../icons/success.png'; // Place a green checkmark image in assets
import {BaseModal} from './BaseModal';

interface SuccessModalProps extends Omit<BaseModalProps, 'children'> {
    message: string;
}

export function SuccessModal({onClose, message, title = 'Success', className }: SuccessModalProps) {
    return (
        <BaseModal isOpen={true} onClose={onClose} title={title} className={className}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <img src={checkmark} alt="Success" style={{width: 48, height: 48}}/>
                <span style={{fontSize: 18}}>{message}</span>
            </div>
            <div className="modal-footer">
                <button onClick={onClose} className="modal-submit">Close</button>
            </div>
        </BaseModal>
    );
}
