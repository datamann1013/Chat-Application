import "./ThreeBoxSection.css";

interface BoxItem {
    title: string;
    content: string;
}

interface ThreeBoxSectionProps {
    items: BoxItem[];
}

export default function ThreeBoxSection({ items }: ThreeBoxSectionProps) {
    // We’ll display the first three items to match "three boxes" requirement.
    const visibleItems = items.slice(0, 3);

    return (
        <div className="three-box-container">
            {visibleItems.map((item, idx) => (
                <div className="box" key={idx}>
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    );
}
