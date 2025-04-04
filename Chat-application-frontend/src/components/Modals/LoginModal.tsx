
import React, {useState} from "react";
import "./ModalStyles.css";
import {Button} from "../UI/Button/Button.tsx";

type ModalView = "login" | "signup" | "reset";

interface LoginModalProps {
    onClose: () => void,
    initialView?: ModalView,
    isOpen?: boolean,
    onLogin?: () => Promise<void>
}

export default function LoginModal({onClose, initialView = "login", isOpen = false, onLogin}: LoginModalProps) {
    const [view, setView] = useState<ModalView>(initialView);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        confirmPassword: ""
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

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
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <Button type="submit" variant="default" size="modal">Log in</Button>
                            </>
                        )}
                        {view === "signup" && (
                            <>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <Button type="submit" variant="default" size="modal">Sign Up</Button>
                            </>
                        )}
                        {view === "reset" && (
                            <>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username or Email"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                                <Button type="submit" variant="default" size="modal">Reset Password</Button>
                            </>
                        )}
                    </form>
                </div>
                <div className="modal-footer">
                    {view !== "login" && (
                        <button onClick={() => setView("login")}>Switch to Login</button>
                    )}
                    {view !== "signup" && (
                        <button onClick={() => setView("signup")}>Switch to Sign Up</button>
                    )}
                    {view !== "reset" && (
                        <button onClick={() => setView("reset")}>Forgot Password?</button>
                    )}
                </div>
            </div>
        </div>
    );
}