import "../../../pages/ChatPage.css";

export default function ChatSidebar() {
    return (
        <aside className="chat-sidebar">
            {/* Icons / Servers Section */}
            <div className="sidebar-top">
                <div className="server-icon active">
                    {/* placeholder icon */}
                    <span className="icon-letter">A</span>
                    <div className="unread-indicator" />
                </div>
                <div className="server-icon">
                    <span className="icon-letter">B</span>
                </div>
                <div className="server-icon">
                    <span className="icon-letter">C</span>
                    <div className="unread-indicator" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="sidebar-search">
                <input type="text" placeholder="Search..." />
            </div>

            {/* Channel List */}
            <div className="channel-list">
                <div className="channel-item unread">
                    <span># general</span>
                    <div className="unread-indicator" />
                </div>
                <div className="channel-item">
                    <span># random</span>
                </div>
                <div className="channel-item">
                    <span># dev-chat</span>
                </div>
            </div>

            {/* User Info */}
            <div className="user-info">
                <div className="user-avatar">U</div>
                <div className="user-details">
                    <span className="username">Username</span>
                    <span className="status">Online</span>
                </div>
            </div>
        </aside>
    );
}
