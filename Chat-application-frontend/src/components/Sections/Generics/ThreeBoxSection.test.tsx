import { render, screen } from "@testing-library/react";
import ThreeBoxSection from "./ThreeBoxSection";

describe("ThreeBoxSection", () => {
    const items = [
        { title: "Box 1", content: "Content 1" },
        { title: "Box 2", content: "Content 2" },
        { title: "Box 3", content: "Content 3" },
        { title: "Box 4", content: "Content 4" }
    ];

    it("renders the default heading", () => {
        render(<ThreeBoxSection items={items} />);
        expect(screen.getByText("Why Choose Our Platform?")).toBeInTheDocument();
    });

    it("renders a custom heading", () => {
        render(<ThreeBoxSection items={items} heading="Custom Heading" />);
        expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    });

    it("renders only three boxes even if more are provided", () => {
        render(<ThreeBoxSection items={items} />);
        expect(screen.getAllByRole("heading", { level: 2 }).length).toBe(4); // 1 heading + 3 box titles
        expect(screen.getByText("Box 1")).toBeInTheDocument();
        expect(screen.getByText("Box 2")).toBeInTheDocument();
        expect(screen.getByText("Box 3")).toBeInTheDocument();
        expect(screen.queryByText("Box 4")).not.toBeInTheDocument();
    });

    it("renders box content", () => {
        render(<ThreeBoxSection items={items} />);
        expect(screen.getByText("Content 1")).toBeInTheDocument();
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.getByText("Content 3")).toBeInTheDocument();
    });
});
