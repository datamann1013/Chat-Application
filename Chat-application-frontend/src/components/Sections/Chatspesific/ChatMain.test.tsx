import { render, screen } from "@testing-library/react";
import ChatMain from "./ChatMain";

beforeAll(() => {
    // Mock scrollIntoView to avoid TypeError in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("ChatMain", () => {
    it("renders channel title and member list toggle", () => {
        render(<ChatMain />);
        expect(screen.getByText("# general")).toBeInTheDocument();
        expect(screen.getByText("Members")).toBeInTheDocument();
    });

    it("renders mock messages", () => {
        render(<ChatMain />);
        // There are two "Alice" messages, so check both are present
        const aliceElements = screen.getAllByText("Alice");
        expect(aliceElements.length).toBe(2);
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("Hey everyone!")).toBeInTheDocument();
        expect(screen.getByText("Hello :)")).toBeInTheDocument();
        expect(screen.getByText("What's up?")).toBeInTheDocument();
        expect(screen.getByText("10:01 AM")).toBeInTheDocument();
    });

    it("renders chat input and buttons", () => {
        render(<ChatMain />);
        expect(screen.getByPlaceholderText("Message #general")).toBeInTheDocument();
        expect(screen.getByText("😊")).toBeInTheDocument();
        expect(screen.getByText("📎")).toBeInTheDocument();
    });
});
