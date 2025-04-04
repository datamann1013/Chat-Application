import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import FilesPage from "./pages/FilesPage";
import LoginModal from "./components/Modals/LoginModal.tsx";
import "./index.css";

export default function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <Router>
            <Header onLoginClick={() => setModalOpen(true)} isLoggedIn={false} onLogin={function (): Promise<void> {
                throw new Error("Function not implemented.");
            }} onLogout={function (): void {
                throw new Error("Function not implemented.");
            }} />
            {isModalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
            {/* Wrap routes in a div with an ID so Header can dynamically scan for H2s */}
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
