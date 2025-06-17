import React, {useRef, useState} from 'react';

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
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [mouseDownInside, setMouseDownInside] = useState<null | boolean>(null);

    React.useEffect(() => {
        if (!isOpen) return;
        const handleDocumentMouseUp = (e: MouseEvent) => {
            if (
                mouseDownInside === false &&
                modalContentRef.current &&
                !modalContentRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
            setMouseDownInside(null);
        };
        const handleDocumentKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('mouseup', handleDocumentMouseUp);
        document.addEventListener('keydown', handleDocumentKeyDown);
        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
            document.removeEventListener('keydown', handleDocumentKeyDown);
        };
    }, [isOpen, mouseDownInside, onClose]);

    const isInteractive = (el: EventTarget | null) => {
        if (!(el instanceof HTMLElement)) return false;
        const tag = el.tagName.toLowerCase();
        return tag === 'button' || tag === 'a' || tag === 'input' || tag === 'textarea' || tag === 'select' || el.hasAttribute('tabindex');
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
            modalContentRef.current &&
            modalContentRef.current.contains(e.target as Node) &&
            !isInteractive(e.target)
        ) {
            setMouseDownInside(true);
        } else {
            setMouseDownInside(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalContentRef}
                className={`modal-content ${className}`}
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
                onMouseDown={handleMouseDown}
            >
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