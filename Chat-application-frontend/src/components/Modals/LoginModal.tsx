import { useState } from "react";
import { Button } from "../UI/Button/Button";
import "./ModalStyles.css";
import { EmailValidation, PasswordValidation, ConfirmPasswordValidation, RequiredTextValidation } from "./ValidationFields";
import { isValidEmail, isNotEmpty, passwordsMatch, isPasswordCompliant } from "../../utils/validation";

type ModalView = "login" | "signup" | "reset";

interface LoginModalProps {
    onClose: () => void;
    initialView?: ModalView; // Add this prop
}

// Temporary array to store registered users until backend is ready
const tempUsers: Array<{ username: string; email: string; fullName: string; password: string }> = [];

export default function LoginModal({ onClose, initialView = "login" }: Readonly<LoginModalProps>) {
    const [view, setView] = useState<ModalView>(initialView);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

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
        // TEMP: Check if user exists in tempUsers
        const user = tempUsers.find(u => u.username === formData.username && u.password === formData.password);
        if (!user) {
            setError("Invalid username or password.");
            setSuccess(null);
            return;
        }
        setSuccess("Login successful! (TEMP: No backend yet)");
        setError(null);
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
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) {
            setError("Please fix the errors below.");
            setSuccess(null);
            return;
        }
        // TEMP: Store user in tempUsers
        tempUsers.push({
            username: formData.username,
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password
        });
        setSuccess("Registration successful! (TEMP: No backend yet)");
        setError(null);
        setFieldErrors({});
        // TODO: Connect to backend for registration
    };

    const handleResetPassword = () => {
        if (!isNotEmpty(formData.username)) {
            setError("Username or email is required.");
            setSuccess(null);
            return;
        }
        setSuccess("If this account exists, a reset link will be sent. (TEMP: No backend yet)");
        setError(null);
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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                    {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
                    {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
                    <form onSubmit={handleSubmit}>
                        {view === "login" && (
                            <>
                                <RequiredTextValidation
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    error={fieldErrors.username}
                                />
                                <PasswordValidation
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={fieldErrors.password}
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
                                    error={fieldErrors.username}
                                />
                                <EmailValidation
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={fieldErrors.email}
                                />
                                <RequiredTextValidation
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    error={fieldErrors.fullName}
                                />
                                <PasswordValidation
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={fieldErrors.password}
                                />
                                <ConfirmPasswordValidation
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={fieldErrors.confirmPassword}
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
                                    error={fieldErrors.username}
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
    );
}