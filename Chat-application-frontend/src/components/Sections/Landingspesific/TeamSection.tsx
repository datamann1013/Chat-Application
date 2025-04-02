import "./TeamSection.css";
import {Button} from "../../UI/Button/Button.tsx";
import HighlightBoxes from "../../UI/HighlightBox/HighlightBox.tsx";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface RoadmapItem {
    title: string;
    date: string;
    implemented: boolean;
}

interface TeamSectionProps {
    team: TeamMember[];
    mission: string;
    roadmap: RoadmapItem[];
    onFeedbackClick: () => void;
}

export default function TeamSection({ team, mission, roadmap, onFeedbackClick }: TeamSectionProps) {
    return (
        <section className="team-section">
            <h2>Meet the Team</h2>
            <p className="mission-statement">{mission}</p>

            <div className="team-grid">
                {team.map((member, idx) => (
                    <HighlightBoxes
                        key={idx}
                        title={member.name}
                        content={member.role}
                        image={member.image}
                        alt={member.name}
                    />
                ))}
            </div>

            <h3>Roadmap</h3>
            <div className="roadmap-snake">
                {roadmap.map((item, idx) => (
                    <div className="roadmap-point" key={idx}>
                        <div className={`roadmap-connector ${item.implemented ? "done" : "future"}`}>
                            <span className="snake-line"></span>
                        </div>
                        <div className="roadmap-content">
                            <h4>{item.title}</h4>
                            <p>{item.implemented ? `Released: ${item.date}` : `Planned: ${item.date}`}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={onFeedbackClick}
                variant="default"
                size="lg"
            >
                Send Feedback
            </Button>
        </section>
    );
}