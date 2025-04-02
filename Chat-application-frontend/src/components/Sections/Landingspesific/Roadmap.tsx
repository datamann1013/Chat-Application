import "./Roadmap.css";

interface RoadmapItem {
    title: string;
    date: string;
    implemented: boolean;
}

interface RoadmapProps {
    items: RoadmapItem[];
}

export default function Roadmap({ items }: RoadmapProps) {
    return (
        <div className="roadmap-container">
            <h2>Roadmap</h2>
            <div className="roadmap-snake">
                {items.map((item, idx) => (
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
        </div>
    );
}