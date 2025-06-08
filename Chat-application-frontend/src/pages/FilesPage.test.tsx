import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FileManagerPage from "./FilesPage";

describe("FileManagerPage", () => {
    it("renders header and footer", () => {
        render(
            <MemoryRouter>
                <FileManagerPage />
            </MemoryRouter>
        );
        expect(screen.getByText(/My Files/i)).toBeInTheDocument();
        expect(screen.getByText(/©/i)).toBeInTheDocument();
    });

    it("renders sidebar sections", () => {
        render(
            <MemoryRouter>
                <FileManagerPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Documents")).toBeInTheDocument();
        expect(screen.getByText("Photos")).toBeInTheDocument();
        expect(screen.getByText("Videos")).toBeInTheDocument();
        expect(screen.getByText("Shared")).toBeInTheDocument();
        expect(screen.getByText("Trash")).toBeInTheDocument();
    });

    it("renders file manager actions", () => {
        render(
            <MemoryRouter>
                <FileManagerPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("New Folder")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search files...")).toBeInTheDocument();
    });

    it("renders file rows", () => {
        render(
            <MemoryRouter>
                <FileManagerPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Design Specs")).toBeInTheDocument();
        expect(screen.getByText("Project Plan")).toBeInTheDocument();
        expect(screen.getByText("Team Photo")).toBeInTheDocument();
    });
});
