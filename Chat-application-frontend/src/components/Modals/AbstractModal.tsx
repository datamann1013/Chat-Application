

import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BaseModalProps } from './types';

abstract class AbstractModal<P extends BaseModalProps> extends React.Component<P> {
    protected abstract renderContent(): React.ReactNode;

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.props.onClose();
        }
    };

    private handleClickOutside = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    };

    componentDidMount(): void {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render(): React.ReactNode {
        if (!this.props.isOpen) return null;

        return (
            <div
                className="modal-overlay"
                onClick={this.handleClickOutside}
            >
                <div
                    className={`modal-content ${this.props.className || ''}`}
                    onClick={(e) => e.stopPropagation()}
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