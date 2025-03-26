import "./ThreeBoxSection.css";

interface BoxItem {
    title: string;
    content: string;
}

interface ThreeBoxSectionProps {
    items: BoxItem[];
    heading?: string; // Optional heading prop, defaults to "Why Choose Our Platform?"
}

export default function ThreeBoxSection({
                                            items,
                                            heading = "Why Choose Our Platform?",
                                        }: ThreeBoxSectionProps) {
    const visibleItems = items.slice(0, 3);

    return (
        <div className="three-box-wrapper">
            <h2 className="three-box-heading">{heading}</h2>
            <div className="three-box-container">
                {visibleItems.map((item, idx) => (
                    <div className="box" key={idx}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
