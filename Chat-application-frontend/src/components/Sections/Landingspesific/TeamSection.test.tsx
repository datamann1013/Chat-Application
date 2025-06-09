import { render, screen, fireEvent } from "@testing-library/react";
import TeamSection from "./TeamSection";

describe("TeamSection", () => {
    const team = [
        { name: "Alice", role: "Developer", image: "alice.png" },
        { name: "Bob", role: "Designer", image: "bob.png" }
    ];
    const mission = "Our mission is to build a secure and user-friendly chat platform.";
    const roadmap = [
        { title: "MVP Launch", date: "2024-01-01", implemented: true },
        { title: "Mobile App", date: "2024-06-01", implemented: false }
    ];
    const onFeedbackClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the team section heading and mission", () => {
        render(<TeamSection team={team} mission={mission} roadmap={roadmap} onFeedbackClick={onFeedbackClick} />);
        expect(screen.getByText("Meet the Team")).toBeInTheDocument();
        expect(screen.getByText(mission)).toBeInTheDocument();
    });

    it("renders all team members", () => {
        render(<TeamSection team={team} mission={mission} roadmap={roadmap} onFeedbackClick={onFeedbackClick} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("Developer")).toBeInTheDocument();
        expect(screen.getByText("Designer")).toBeInTheDocument();
        expect(screen.getByAltText("Alice")).toBeInTheDocument();
        expect(screen.getByAltText("Bob")).toBeInTheDocument();
    });

    it("renders the roadmap items", () => {
        render(<TeamSection team={team} mission={mission} roadmap={roadmap} onFeedbackClick={onFeedbackClick} />);
        expect(screen.getByText("MVP Launch")).toBeInTheDocument();
        expect(screen.getByText("Mobile App")).toBeInTheDocument();
        expect(screen.getByText("Released: 2024-01-01")).toBeInTheDocument();
        expect(screen.getByText("Planned: 2024-06-01")).toBeInTheDocument();
    });

    it("calls onFeedbackClick when feedback button is clicked", () => {
        render(<TeamSection team={team} mission={mission} roadmap={roadmap} onFeedbackClick={onFeedbackClick} />);
        fireEvent.click(screen.getByText("Send Feedback"));
        expect(onFeedbackClick).toHaveBeenCalled();
    });
});
