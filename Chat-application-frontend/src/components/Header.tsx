import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

export default function Header({ onLoginClick }: { onLoginClick: () => void }) {
    const location = useLocation();
    // @ts-ignore
    const [sections, setSections] = useState<Section[]>([]);
    const [currentPageTitle, setCurrentPageTitle] = useState<string>("Current Page");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredPageSections, setHoveredPageSections] = useState<Section[]>([]);

    // Update current page title and scan current page for H2 sections
    useEffect(() => {
        const currentItem = navItems.find(item => item.link === location.pathname);
        setCurrentPageTitle(currentItem ? currentItem.title : "Current Page");

        const content = document.getElementById("page-content");
        if (content) {
            const headers = Array.from(content.querySelectorAll("h2"));
            const sects = headers.map((header, idx) => ({
                id: header.id || `section-${idx}`,
                title: header.textContent || `Section ${idx + 1}`,
            }));
            setSections(sects);
        }
    }, [location]);

    // Placeholder: When hovering over a page in dropdown, update section preview
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

    return (
        <header className="global-header">
            <div className="header-left">
                {/* Replace "logo.png" with your actual logo image placed in the /public folder */}
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="header-center">
                <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span className="current-page">{currentPageTitle}</span>
                    <span className="arrow">▼</span>
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
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
                                            <a href={`#${sect.id}`}>{sect.title}</a>
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
            <div className="header-right">
                <button className="login-btn" onClick={onLoginClick}>Login</button>
            </div>
        </header>
    );
}
