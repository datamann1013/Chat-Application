import Header from "../components/Header/Header.tsx";
import "./ChatPage.css";
import ChatSidebar from "../components/Sections/Chatspesific/ChatSidebar.tsx";
import ChatMain from "../components/Sections/Chatspesific/ChatMain.tsx";

export default function ChatPage() {
    return (
        <div className="chat-page">
            <Header onLoginClick={function(): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="chat-page-container">
                <ChatSidebar />
                <ChatMain />
            </div>
        </div>
    );
}
