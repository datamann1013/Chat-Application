import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from '../UI/Button/Button.tsx'
import "./Header.css";

interface NavItem {
    title: string;
    link: string;
}


const navItems: NavItem[] = [
    { title: "Landing", link: "/" },
    { title: "Chat", link: "/chat" },
    { title: "Files", link: "/files" },
];

interface Section {
    id: string;
    title: string;
}
interface HeaderProps {
    isLoggedIn: boolean;
    onLogin: () => Promise<void>;
    onLogout: () => void;
    onLoginClick: () => void;
}

export default function Header({ isLoggedIn, onLogin, onLogout, onLoginClick }: HeaderProps) {
    const location = useLocation();
    const [sections, setSections] = useState<Section[]>([]);
    const [currentPageTitle, setCurrentPageTitle] = useState<string>("Current Page");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredPageSections, setHoveredPageSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLoginClick = async () => {
        setLoading(true);
        try {
            await onLogin();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentItem = navItems.find((item) => item.link === location.pathname);
        setCurrentPageTitle(currentItem ? currentItem.title : "Current Page");

        const content = document.getElementById("page-content");
        if (content) {
            const headers = Array.from(content.querySelectorAll("h2"));
            const sects = headers.map((header, idx) => ({
                id: header.id || `section-${idx}`,
                title: header.textContent || `Section ${idx + 1}`,
            }));
            setSections(sects);
            // Default to current page sections if nothing is hovered
            setHoveredPageSections(sects);
        }
    }, [location]);

    const handlePageHover = (page: NavItem) => {
        let dummySections: Section[] = [];
        if (page.title === "Landing") {
            dummySections = [
                { id: "overview", title: "Overview" },
                { id: "features", title: "Features" },
                { id: "about", title: "About" },
            ];
        } else if (page.title === "Chat") {
            dummySections = [
                { id: "chat-overview", title: "Chat Overview" },
                { id: "messages", title: "Messages" },
            ];
        } else if (page.title === "Files") {
            dummySections = [
                { id: "files-overview", title: "Files Overview" },
                { id: "upload", title: "Upload Files" },
            ];
        }
        setHoveredPageSections(dummySections);
    };

    const handleDropdownMouseLeave = () => {
        setHoveredPageSections(sections);
    };

    return (
        <header className="global-header">
            {/* Left column: Logo */}
            <div className="header-left">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="logo" />
                </Link>
            </div>

            {/* Center column: Current page + dropdown */}
            <div className="header-center">
                <div className="dropdown-toggle">
                    <Button
                        variant="default"
                        size="md"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span className="current-page">{currentPageTitle}</span>
                        <span className="arrow">▼</span>
                    </Button>
                </div>

                {dropdownOpen && (
                    <div className="dropdown-menu" onMouseLeave={handleDropdownMouseLeave}>
                        <div className="dropdown-left">
                            <ul>
                                {navItems.map((item) => (
                                    <li key={item.title} onMouseEnter={() => handlePageHover(item)}>
                                        <Link to={item.link} onClick={() => setDropdownOpen(false)}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dropdown-right">
                            <ul>
                                {hoveredPageSections.length > 0 ? (
                                    hoveredPageSections.map((sect) => (
                                        <li key={sect.id}>
                                            <a href={`#${sect.id}`} onClick={() => setDropdownOpen(false)}>
                                                {sect.title}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li>No preview available</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Right column: Login button */}
            <div className="header-right">
                <Button
                    onClick={handleLoginClick}
                    disabled={loading}
                    variant="default"
                    size="md"
                >
                    {isLoggedIn ? 'Profile' : 'Log in'}
                </Button>
            </div>

            {/*loginOpen && (<LoginModal onClose={() => setLoginOpen(false)}/>)*/}
        </header>
    );
}