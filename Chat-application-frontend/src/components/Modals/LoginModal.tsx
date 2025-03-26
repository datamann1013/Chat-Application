import { useState } from "react";
import "./LoginModal.css";

type ModalView = "login" | "signup" | "reset";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const [view, setView] = useState<ModalView>("login");

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
                    {view === "login" && (
                        <form>
                            <input type="text" placeholder="Username" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Login</button>
                        </form>
                    )}
                    {view === "signup" && (
                        <form>
                            <input type="text" placeholder="Username" required />
                            <input type="email" placeholder="Email" required />
                            <input type="text" placeholder="Full Name" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    )}
                    {view === "reset" && (
                        <form>
                            <input type="text" placeholder="Username or Email" required />
                            <button type="submit">Reset Password</button>
                        </form>
                    )}
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
