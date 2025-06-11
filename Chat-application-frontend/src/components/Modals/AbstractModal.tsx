import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BaseModalProps } from './types';

abstract class AbstractModal<P extends BaseModalProps> extends React.Component<P> {
    private modalContentRef = React.createRef<HTMLDivElement>();
    private mouseDownInside: boolean | null = null;

    protected abstract renderContent(): React.ReactNode;

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.props.onClose();
        }
    };

    componentDidMount(): void {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown);
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    }

    private handleDocumentMouseDown = (event: MouseEvent): void => {
        if (
            this.modalContentRef.current &&
            this.modalContentRef.current.contains(event.target as Node)
        ) {
            this.mouseDownInside = true;
        } else {
            this.mouseDownInside = false;
        }
    };

    private handleDocumentMouseUp = (event: MouseEvent): void => {
        if (
            this.mouseDownInside === false &&
            this.modalContentRef.current &&
            !this.modalContentRef.current.contains(event.target as Node)
        ) {
            this.props.onClose();
        }
        this.mouseDownInside = null;
    };

    render(): React.ReactNode {
        if (!this.props.isOpen) return null;

        return (
            <div
                className="modal-overlay"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}
            >
                <div
                    ref={this.modalContentRef}
                    className={`modal-content ${this.props.className || ''}`}
                    onClick={e => e.stopPropagation()}
                >
                    {this.props.title && (
                        <div className="modal-header">
                            <h2>{this.props.title}</h2>
                            <button
                                className="close-btn"
                                onClick={this.props.onClose}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <div className="modal-body">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AbstractModal;