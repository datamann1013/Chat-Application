import "./TeamSection.css";

interface TeamMember {
    name: string;
    role: string;
}

interface TeamSectionProps {
    team: TeamMember[];
    mission: string;
    roadmap: string[];
    onFeedbackClick: () => void;
}

export default function TeamSection({
                                        team,
                                        mission,
                                        roadmap,
                                        onFeedbackClick,
                                    }: TeamSectionProps) {
    return (
        <div className="team-section">
            <h2>Meet the Team</h2>
            <p className="mission-statement">{mission}</p>
            <div className="team-members">
                {team.map((member, idx) => (
                    <div className="team-member" key={idx}>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>

            <h3>Roadmap</h3>
            <ul className="roadmap-list">
                {roadmap.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <button className="feedback-btn" onClick={onFeedbackClick}>
                Give Feedback
            </button>
        </div>
    );
}
