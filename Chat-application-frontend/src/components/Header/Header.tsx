import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Button} from '../UI/Button/Button.tsx'
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

export default function Header({ onLoginClick }: Readonly<{ onLoginClick: () => void }>) {
    const location = useLocation();
    const [sections, setSections] = useState<Section[]>([]);
    const [currentPageTitle, setCurrentPageTitle] = useState<string>("Current Page");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredPageSections, setHoveredPageSections] = useState<Section[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const currentItem = navItems.find((item) => item.link === location.pathname);
        setCurrentPageTitle(currentItem ? currentItem.title : "Current Page");

        const content = document.getElementById("page-content");
        if (content) {
            const headers = Array.from(content.querySelectorAll("h2"));
            const sects = headers.map((header, idx) => ({
                id: header.id || `section-${idx}`,
                title: header.textContent ?? `Section ${idx + 1}`,
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
                { id: "Why Choose Our Platform?", title: "Why Choose Our Platform?" },
                { id: "Meet the Team", title: "Meet the Team" },
                { id: "Roadmap", title: "Roadmap" },
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <header className="global-header">
            {/* Left column: Logo */}
            <div className="header-left">
                <Link to="/">
                    <img src="/src/images/logo.png" alt="Logo" className="logo"/>
                </Link>
            </div>

            {/* Center column: Current page + dropdown */}
            <div className="header-center">
                <div className="dropdown-toggle">
                    <Button
                        ref={buttonRef}
                        variant="default"
                        size="md"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-label="Current Page"
                    >
                        <span className="current-page">{currentPageTitle}</span>
                        <span className="arrow">▼</span>
                    </Button>
                </div>

                {dropdownOpen && (
                    <div className="dropdown-menu" ref={dropdownRef} onMouseLeave={handleDropdownMouseLeave}>
                        <div className="dropdown-left">
                            <ul>
                                {navItems.map((item) => (
                                    <li
                                        key={item.title}
                                        onMouseEnter={() => handlePageHover(item)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <button
                                            id={`nav-link-${item.title}`}
                                            type="button"
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                window.location.href = item.link;
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    setDropdownOpen(false);
                                                    window.location.href = item.link;
                                                }
                                            }}
                                            aria-label={item.title}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                margin: 0,
                                                cursor: 'pointer',
                                                width: '100%',
                                                textAlign: 'left'
                                            }}
                                            role="menuitem"
                                            tabIndex={0}
                                            onMouseDown={e => e.preventDefault()} // Prevent focus loss
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dropdown-right">
                            <ul>
                                {hoveredPageSections.length > 0 ? (
                                    hoveredPageSections.map((sect) => (
                                        <li key={sect.id}>
                                            <a
                                                href={`#${sect.id}`}
                                                role="link"
                                                tabIndex={0}
                                                onClick={() => setDropdownOpen(false)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setDropdownOpen(false);
                                                        // Let the browser handle anchor navigation
                                                    }
                                                }}
                                            >
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
                    onClick={onLoginClick}
                    variant="default"
                    size="md"
                    aria-label="Login Button"
                >
                    Log in
                </Button>
            </div>
        </header>
    );
}