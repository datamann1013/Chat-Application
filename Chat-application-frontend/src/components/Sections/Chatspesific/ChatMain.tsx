import { useEffect, useRef } from "react";
import "../../../pages/ChatPage.css";

export default function ChatMain() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom whenever new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []); // In real usage, add a messages array dependency

    const mockMessages = [
        { user: "Alice", text: "Hey everyone!", time: "10:01 AM" },
        { user: "Bob", text: "Hello :)", time: "10:02 AM" },
        { user: "Alice", text: "What's up?", time: "10:03 AM" },
        // ...
    ];

    return (
        <main className="chat-main">
            <div className="chat-topbar">
                <div className="channel-title"># general</div>
                <button className="member-list-toggle">Members</button>
            </div>
            <div className="chat-messages">
                {mockMessages.map((msg, idx) => (
                    <div key={idx} className="message-row">
                        <div className="message-info">
                            <span className="message-user">{msg.user}</span>
                            <span className="message-time">{msg.time}</span>
                        </div>
                        <div className="message-text">{msg.text}</div>
                        {/* Subtle divider after each message */}
                        <hr className="message-divider" />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <button className="emoji-btn">😊</button>
                <button className="file-btn">📎</button>
                <input type="text" placeholder="Message #general" />
                <button className="send-btn" aria-label="Send">➤</button>
            </div>
        </main>
    );
}

