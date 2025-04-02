import React from 'react';
import AbstractModal from './AbstractModal';
import { FeedbackModalProps } from './types';
import {Button} from "../UI/Button/Button.tsx";

export class FeedbackModal extends AbstractModal<FeedbackModalProps> {
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const feedback = formData.get('feedback') as string;

        if (this.props.onSubmit) {
            this.props.onSubmit(feedback);
        }
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea
                    name="feedback"
                    placeholder="Your feedback..."
                    rows={5}
                    required
                    className="modal-textarea"
                />
                <Button type= "submit" variant="default" size="modal">Send Feedback</Button>
            </form>
        );
    }
}