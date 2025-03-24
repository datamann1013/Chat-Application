import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import FilesPage from "./pages/FilesPage";
import LoginModal from "./components/LoginModal";
import "./index.css";

export default function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <Router>
            <Header onLoginClick={() => setModalOpen(true)} />
            {isModalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
            {/* Wrap routes in a div with an ID so Header can dynamically scan for H2s */}
            <div id="page-content" style={{ paddingTop: "80px" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/files" element={<FilesPage />} />
                </Routes>
            </div>
        </Router>
    );
}
