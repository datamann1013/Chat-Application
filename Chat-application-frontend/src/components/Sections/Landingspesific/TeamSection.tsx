import "./TeamSection.css";
import HighlightBoxes from "../../UI/HighlightBox/HighlightBox.tsx";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}


interface TeamSectionProps {
    team: TeamMember[];
    mission: string;


}

export default function TeamSection({ team, mission }: TeamSectionProps) {
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
        </section>
    );
}