import {BaseModalProps} from './types';
import errorIcon from '../../icons/error.png'; // Place a red X image in assets
import {BaseModal} from './BaseModal';

interface ErrorModalProps extends Omit<BaseModalProps, 'children'> {
    message: string;
    onBack: () => void;
    backLabel?: string;
}

export function ErrorModal({
                               onClose,
                               message,
                               onBack,
                               backLabel = 'Back',
                               title = 'Error',
                               className
                           }: Readonly<ErrorModalProps>) {
    return (
        <BaseModal isOpen={true} onClose={onClose} title={title} className={className}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <img src={errorIcon} alt="Error" style={{width: 48, height: 48}}/>
                <span style={{fontSize: 18}}>{message}</span>
            </div>
            <div className="modal-footer">
                <button onClick={onBack} className="modal-submit">{backLabel}</button>
            </div>
        </BaseModal>
    );
}
