export type ModalView = "login" | "signup" | "reset";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export interface FeedbackModalProps extends BaseModalProps {
    onSubmit?: (feedback: string) => void;
}

export interface NewsletterModalProps extends BaseModalProps {
    onSubmit?: (email: string) => void;
}

export interface LoginModalProps extends BaseModalProps {
    onLogin?: (username: string, password: string) => void;
    onSignup?: (data: {
        username: string;
        email: string;
        fullName: string;
        password: string;
    }) => void;
    onResetPassword?: (username: string) => void;
    initialView?: ModalView;
}