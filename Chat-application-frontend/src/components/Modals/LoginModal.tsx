import React, {useState} from "react";
import {Button} from "../UI/Button/Button";
import "./ModalStyles.css";
import {
    ConfirmPasswordValidation,
    EmailValidation,
    PasswordValidation,
    RequiredTextValidation
} from "./ValidationFields";
import {isNotEmpty, isPasswordCompliant, isValidEmail, passwordsMatch} from "../../utils/validation";
import {useFeedbackModal} from './useFeedbackModal';
import {BaseModal} from "./BaseModal";
import type {LoginModalProps, ModalView} from "./Types";

// Temporary array to store registered users until backend is ready
const tempUsers: Array<{ username: string; email: string; fullName: string; password: string }> = [];

export default function LoginModal({ onClose, initialView = "login" }: Readonly<LoginModalProps>) {
    const [view, setView] = useState<ModalView>(initialView as ModalView);
    const {
        showSuccess,
        showError,
        feedbackModals,
    } = useFeedbackModal();

    // Form state management
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        confirmPassword: ""
    });

    // Form submission handlers
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        switch (view) {
            case "login":
                handleLogin();
                break;
            case "signup":
                handleSignup();
                break;
            case "reset":
                handleResetPassword();
                break;
        }
    };

    // View-specific handlers
    const handleLogin = () => {
        const hashedInputPassword = hashPassword(formData.password);
        const user = tempUsers.find(u => u.username === formData.username && u.password === hashedInputPassword);
        if (!user) {
            showError("Invalid username or password.");
            return;
        }
        showSuccess("Login successful! (TEMP: No backend yet)");
    };

    const handleSignup = () => {
        const errors: { [key: string]: string } = {};
        if (!isNotEmpty(formData.username)) errors.username = "Username is required.";
        if (!isNotEmpty(formData.email)) errors.email = "Email is required.";
        else if (!isValidEmail(formData.email)) errors.email = "Invalid email format.";
        if (!isNotEmpty(formData.fullName)) errors.fullName = "Full name is required.";
        if (!isNotEmpty(formData.password)) errors.password = "Password is required.";
        else if (!isPasswordCompliant(formData.password)) errors.password = "Password must be at least 6 characters, include a letter and a number.";
        if (!isNotEmpty(formData.confirmPassword)) errors.confirmPassword = "Confirm your password.";
        else if (!passwordsMatch(formData.password, formData.confirmPassword)) errors.confirmPassword = "Passwords do not match.";
        if (Object.keys(errors).length > 0) {
            showError(Object.values(errors).join("\n"));
            return;
        }
        tempUsers.push({
            username: formData.username,
            email: formData.email,
            fullName: formData.fullName,
            password: hashPassword(formData.password)
        });
        showSuccess("Registration successful! (TEMP: No backend yet)");
    };

    const handleResetPassword = () => {
        if (!isNotEmpty(formData.username)) {
            showError("Username or email is required.");
            return;
        }
        showSuccess("If this account exists, a reset link will be sent. (TEMP: No backend yet)");
    };

    // Form field change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    let modalTitle = "Login";
    if (view === "signup") {
        modalTitle = "Sign Up";
    } else if (view === "reset") {
        modalTitle = "Reset Password";
    }
    return (
        <>
            <BaseModal
                isOpen={true}
                onClose={onClose}
                title={modalTitle}
            >
                <form onSubmit={handleSubmit}>
                    {view === "login" && (
                        <>
                            <RequiredTextValidation
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}

                            />
                            <PasswordValidation
                                value={formData.password}
                                onChange={handleInputChange}

                            />
                            <Button
                                type="submit"
                                aria-label="login"
                                fullModalWidth
                            >
                                Login
                            </Button>
                        </>
                    )}
                    {view === "signup" && (
                        <>
                            <RequiredTextValidation
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}

                            />
                            <EmailValidation
                                value={formData.email}
                                onChange={handleInputChange}

                            />
                            <RequiredTextValidation
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}

                            />
                            <PasswordValidation
                                value={formData.password}
                                onChange={handleInputChange}

                            />
                            <ConfirmPasswordValidation
                                value={formData.confirmPassword}
                                onChange={handleInputChange}

                            />
                            <Button
                                type="submit"
                                aria-label="sign up"
                                fullModalWidth
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                    {view === "reset" && (
                        <>
                            <RequiredTextValidation
                                name="username"
                                placeholder="Username or Email"
                                value={formData.username}
                                onChange={handleInputChange}

                            />
                            <Button
                                type="submit"
                                aria-label="reset password"
                                fullModalWidth
                            >
                                Reset Password
                            </Button>
                        </>
                    )}
                </form>
                <div className="modal-footer">
                    {view !== "login" && (
                        <Button
                            onClick={() => setView("login")}
                            aria-label="switch to login"
                            fullModalWidth
                            variant="ghost"
                        >
                            Switch to Login
                        </Button>
                    )}
                    {view !== "signup" && (
                        <Button
                            onClick={() => setView("signup")}
                            aria-label="switch to sign up"
                            fullModalWidth
                            variant="ghost"
                        >
                            Switch to Sign Up
                        </Button>
                    )}
                    {view !== "reset" && (
                        <Button
                            onClick={() => setView("reset")}
                            aria-label="forgot password"
                            fullModalWidth
                            variant="ghost"
                        >
                            Forgot Password?
                        </Button>
                    )}
                </div>
            </BaseModal>
            {feedbackModals}
        </>
    );
}

// Basic hash function for demonstration only
function hashPassword(password: string): string {
    // TODO: Replace with a secure hash function with salt (e.g., bcrypt, argon2) before production
    let hash = 0, i, chr;
    if (password.length === 0) return hash.toString();
    for (i = 0; i < password.length; i++) {
        chr = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}