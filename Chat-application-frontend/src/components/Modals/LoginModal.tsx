import React, { useRef, useState } from "react";
import { Button } from "../UI/Button/Button";
import "./ModalStyles.css";
import { EmailValidation, PasswordValidation, ConfirmPasswordValidation, RequiredTextValidation } from "./ValidationFields";
import { isValidEmail, isNotEmpty, passwordsMatch, isPasswordCompliant } from "../../utils/validation";
import { SuccessModal } from "./SuccessModal";
import { ErrorModal } from "./ErrorModal";

type ModalView = "login" | "signup" | "reset";

interface LoginModalProps {
    onClose: () => void;
    initialView?: ModalView; // Add this prop
}

// Temporary array to store registered users until backend is ready
const tempUsers: Array<{ username: string; email: string; fullName: string; password: string }> = [];

export default function LoginModal({ onClose, initialView = "login" }: Readonly<LoginModalProps>) {
    const [view, setView] = useState<ModalView>(initialView);
    // Ensure modals are not shown on mount
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Form state management
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        confirmPassword: ""
    });

    // mousedown/mouseup logic
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [mouseDownInside, setMouseDownInside] = useState<null | boolean>(null);

    React.useEffect(() => {
        if (!showSuccessModal && !showErrorModal) return;
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
        document.addEventListener("mouseup", handleDocumentMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };
    }, [showSuccessModal, showErrorModal, mouseDownInside, onClose]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
            modalContentRef.current &&
            modalContentRef.current.contains(e.target as Node)
        ) {
            setMouseDownInside(true);
        } else {
            setMouseDownInside(false);
        }
    };

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
        // TEMP: Check if user exists in tempUsers
        const user = tempUsers.find(u => u.username === formData.username && u.password === formData.password);
        if (!user) {
            setModalMessage("Invalid username or password.");
            setShowErrorModal(true);
            return;
        }
        setModalMessage("Login successful! (TEMP: No backend yet)");
        setShowSuccessModal(true);
        // TODO: Connect to backend for login
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
            // Show all error messages in the ErrorModal
            setModalMessage(Object.values(errors).join("\n"));
            setShowErrorModal(true);
            return;
        }
        // TEMP: Store user in tempUsers
        tempUsers.push({
            username: formData.username,
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password
        });
        setModalMessage("Registration successful! (TEMP: No backend yet)");
        setShowSuccessModal(true);
        // TODO: Connect to backend for registration
    };

    const handleResetPassword = () => {
        if (!isNotEmpty(formData.username)) {
            setModalMessage("Username or email is required.");
            setShowErrorModal(true);
            return;
        }
        setModalMessage("If this account exists, a reset link will be sent. (TEMP: No backend yet)");
        setShowSuccessModal(true);
        // TODO: Connect to backend for password reset
    };

    // Form field change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="modal-overlay" onMouseDown={handleMouseDown}>
                <div
                    ref={modalContentRef}
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>
                            {view === "login"
                                ? "Login"
                                : view === "signup"
                                    ? "Sign Up"
                                    : "Reset Password"}
                        </h2>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
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
                    </div>
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
                </div>
            </div>
            {showSuccessModal && !!modalMessage && (
                <SuccessModal
                    isOpen={true}
                    onClose={() => {
                        setShowSuccessModal(false);
                        setModalMessage("");
                    }}
                    message={modalMessage}
                />
            )}
            {showErrorModal && !!modalMessage && (
                <ErrorModal
                    isOpen={true}
                    onClose={() => {
                        setShowErrorModal(false);
                        setModalMessage("");
                    }}
                    message={modalMessage}
                    onBack={() => {
                        setShowErrorModal(false);
                        setModalMessage("");
                    }}
                />
            )}
        </>
    );
}