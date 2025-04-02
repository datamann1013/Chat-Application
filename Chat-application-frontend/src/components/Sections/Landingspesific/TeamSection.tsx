import "./TeamSection.css";
import {Button} from "../../UI/Button/Button.tsx";

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

export default function TeamSection({
                                        team,
                                        mission,
                                        roadmap,
                                        onFeedbackClick,
                                    }: TeamSectionProps) {
    return (
        <section className="team-section">
            <h2>Meet the Team</h2>
            <p className="mission-statement">{mission}</p>

            <div className="team-grid">
                {team.map((member, idx) => (
                    <div className="team-card" key={idx}>
                        <img src={member.image} alt={member.name} className="team-image" />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
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