import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import FilesPage from "./pages/FilesPage";
import LoginModal from "./components/Modals/LoginModal.tsx";
import "./index.css";

export default function App() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            // Your login logic here
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Router>
            <Header
                onLoginClick={() => setLoginOpen(true)}
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={() => setIsLoggedIn(false)}
            />
            {loginOpen && (
                <LoginModal
                    isOpen={loginOpen}
                    onClose={() => setLoginOpen(false)}
                    onLogin={handleLogin}
                />
            )}
            <div id="page-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/files" element={<FilesPage />} />
                </Routes>
            </div>
        </Router>
    );
}
