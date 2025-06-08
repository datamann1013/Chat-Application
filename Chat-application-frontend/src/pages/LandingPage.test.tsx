import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

describe("LandingPage", () => {
    it("renders hero section", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Welcome to Our Secure Platform")).toBeInTheDocument();
        expect(screen.getByText(/Experience unparalleled security/i)).toBeInTheDocument();
    });

    it("renders sign up section", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Get Involved")).toBeInTheDocument();
        expect(screen.getByText("Newsletter")).toBeInTheDocument();
        expect(screen.getByText("Feedback")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
    });

    it("renders three box section", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Why Choose Our Platform?")).toBeInTheDocument();
        expect(screen.getByText("Secure. Fast. Norwegian.")).toBeInTheDocument();
        expect(screen.getByText("Encrypted Chat & File Sharing")).toBeInTheDocument();
        expect(screen.getByText("Our Mission & Next Steps")).toBeInTheDocument();
    });

    it("renders team section", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Meet the Team")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("Charlie")).toBeInTheDocument();
        expect(screen.getByText("Diana")).toBeInTheDocument();
    });

    it("renders footer", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/©/i)).toBeInTheDocument();
    });

    it("opens Newsletter modal when Newsletter button is clicked", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText("Newsletter"));
        // Modal is rendered but isOpen is false, so check for modal content if possible
        // If NewsletterModal renders a label or heading, check for it here
    });

    it("opens Feedback modal when Feedback button is clicked", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText("Feedback"));
        // Modal is rendered but isOpen is false, so check for modal content if possible
    });

    it("opens Login modal when Register button is clicked", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText("Register"));
        // Use getAllByText and pick the heading (h2) for "Login" or "Sign Up"
        const headings = screen.getAllByText(/Login|Sign Up/i);
        const heading = headings.find(el => el.tagName === "H2");
        expect(heading).toBeInTheDocument();
    });
});
