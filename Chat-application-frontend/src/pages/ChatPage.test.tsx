import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChatPage from "./ChatPage";

beforeAll(() => {
    // Mock scrollIntoView to avoid TypeError in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("ChatPage", () => {
    it("renders header", () => {
        render(
            <MemoryRouter>
                <ChatPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/My Files|Chat/i)).toBeInTheDocument();
    });

    it("renders chat sidebar", () => {
        render(
            <MemoryRouter>
                <ChatPage />
            </MemoryRouter>
        );
        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("C")).toBeInTheDocument();
    });

    it("renders chat main area", () => {
        render(
            <MemoryRouter>
                <ChatPage />
            </MemoryRouter>
        );
        // Use getAllByText to avoid ambiguity
        const generalElements = screen.getAllByText("# general");
        expect(generalElements.length).toBeGreaterThan(0);
        expect(screen.getByText("Members")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Message #general")).toBeInTheDocument();
    });
});
