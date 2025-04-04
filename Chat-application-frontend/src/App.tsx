import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import FilesPage from "./pages/FilesPage";
import LoginModal from "./components/Modals/LoginModal.tsx";
import {NewsletterModal} from "./components/Modals/NewsletterModal.tsx";
import {FeedbackModal} from "./components/Modals/FeedbackModal.tsx";
import "./index.css";

export default function App() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegisterView, setIsRegisterView] = useState(false);

    const handleLogin = async () => {
        try {
            // Your login logic here
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = () => {
        setIsRegisterView(true);
        setLoginOpen(true);
    };

    return (
        <Router>
            <Header
                onLoginClick={() => setLoginOpen(true)}
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={() => setIsLoggedIn(false)}
                onRegisterClick={() => setIsRegisterView(true)}            />
            {loginOpen && (
                <LoginModal
                    isOpen={loginOpen}
                    onClose={() => setLoginOpen(false)}
                    onLogin={handleLogin}
                    onRegister={() => {
                        // Your register logic here
                        console.log('Register clicked');
                    }}
                />
            )}
            {newsletterOpen && (
                <NewsletterModal
                    isOpen={newsletterOpen}
                    onClose={() => setNewsletterOpen(false)}
                    onSubmit={(email: string) => {
                        console.log('Newsletter submitted:', email);
                        setNewsletterOpen(false);
                    }} children={undefined}                />
            )}
            {feedbackOpen && (
                <FeedbackModal
                    isOpen={feedbackOpen}
                    onClose={() => setFeedbackOpen(false)}
                    onSubmit={(feedback: string) => {
                        console.log('Feedback submitted:', feedback);
                        setFeedbackOpen(false);
                    }} children={undefined}                />
            )}
            <div id="page-content">
                <div id="page-content">
                    <Routes>
                        <Route path="/" element={
                            <LandingPage
                                onRegisterClick={() => setLoginOpen(true)}
                                onNewsletterClick={() => setNewsletterOpen(true)}
                                onFeedbackClick={() => setFeedbackOpen(true)}
                            />
                        } />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/files" element={<FilesPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
