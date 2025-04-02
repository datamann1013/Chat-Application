import "./ThreeBoxSection.css";
import HighlightBoxes from "../../UI/HighlightBox/HighlightBox.tsx";

interface BoxItem {
    title: string;
    content: string;
}

interface ThreeBoxSectionProps {
    items: BoxItem[];
    heading?: string; // Optional heading prop, defaults to "Why Choose Our Platform?"
}

export default function ThreeBoxSection({ items, heading = "Why Choose Our Platform?" }: ThreeBoxSectionProps) {
    const visibleItems = items.slice(0, 3);

    return (
        <div className="three-box-wrapper">
            <h2 className="three-box-heading">{heading}</h2>
            <div className="three-box-container">
                {visibleItems.map((item, idx) => (
                    <HighlightBoxes
                        key={idx}
                        title={item.title}
                        content={item.content}
                        width={"33vw"}
                    />
                ))}
            </div>
        </div>
    );
}