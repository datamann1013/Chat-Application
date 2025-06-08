import { useState } from "react";
import { Button } from "../UI/Button/Button";
import { InputField } from "../UI/InputField/InputField";
import "./ModalStyles.css";

type ModalView = "login" | "signup" | "reset";

interface LoginModalProps {
    onClose: () => void;
    initialView?: ModalView; // Add this prop
}

export default function LoginModal({ onClose, initialView = "login" }: Readonly<LoginModalProps>) {
    const [view, setView] = useState<ModalView>(initialView);

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
        console.log("Login attempted with:", formData.username, formData.password);
        // Add your login logic here
    };

    const handleSignup = () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log("Signup attempted with:", formData);
        // Add your signup logic here
    };

    const handleResetPassword = () => {
        console.log("Reset password requested for:", formData.username);
        // Add your password reset logic here
    };

    // Form field change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <form onSubmit={handleSubmit}>
                        {view === "login" && (
                            <>
                                <InputField
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    fullModalWidth
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    fullModalWidth
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
                                <InputField
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    fullModalWidth
                                />
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullModalWidth
                                />
                                <InputField
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    fullModalWidth
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    fullModalWidth
                                />
                                <InputField
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    fullModalWidth
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
                                <InputField
                                    type="text"
                                    name="username"
                                    placeholder="Username or Email"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    fullModalWidth
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