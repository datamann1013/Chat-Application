interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export function BaseModal({
                              isOpen,
                              onClose,
                              children,
                              title,
                              className = '',
                          }: BaseModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${className}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {title && <h2>{title}</h2>}
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}