import "./TeamSection.css";
import React from "react";
import CharacterCardModal from "../../Modals/CharacterCardModal.tsx";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    qualifications: string;
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
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
    return (
        <section className="team-section">
            <h2>Meet the Team</h2>
            <p className="mission-statement">{mission}</p>

            <div className="team-grid">
                {team.map((member, idx) => (
                    <div
                        className="team-card"
                        key={idx}
                        onClick={() => setSelectedMember(member)}
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedMember(member);
                            }
                        }}
                        style={{cursor: "pointer"}}
                        role="button"
                        aria-pressed={selectedMember === member}
                    >
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

            <button className="feedback-btn" onClick={onFeedbackClick}>
                Send Feedback
            </button>
            {selectedMember && (
                <CharacterCardModal
                    isOpen={!!selectedMember}
                    onClose={() => setSelectedMember(null)}
                    name={selectedMember.name}
                    role={selectedMember.role}
                    image={selectedMember.image}
                    qualifications={selectedMember.qualifications}
                />
            )}
        </section>
    );
}