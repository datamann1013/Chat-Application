import { render, screen } from "@testing-library/react";
import ChatSidebar from "./ChatSidebar";

describe("ChatSidebar", () => {
    it("renders server icons", () => {
        render(<ChatSidebar />);
        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("C")).toBeInTheDocument();
    });

    it("renders search bar", () => {
        render(<ChatSidebar />);
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("renders channel list", () => {
        render(<ChatSidebar />);
        expect(screen.getByText("# general")).toBeInTheDocument();
        expect(screen.getByText("# random")).toBeInTheDocument();
        expect(screen.getByText("# dev-chat")).toBeInTheDocument();
    });

    it("renders user info", () => {
        render(<ChatSidebar />);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Online")).toBeInTheDocument();
        expect(screen.getByText("U")).toBeInTheDocument();
    });
});
