import React from 'react';
import AbstractModal from './AbstractModal';
import { NewsletterModalProps } from './types';
import {Button} from "../UI/Button/Button.tsx";

export class NewsletterModal extends AbstractModal<NewsletterModalProps> {
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        if (this.props.onSubmit) {
            this.props.onSubmit(email);
        }
    };

    protected renderContent(): React.ReactNode {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="modal-input"
                />
                <Button type= "submit" variant="default" size="modal">Subscribe</Button>
            </form>
        );
    }
}