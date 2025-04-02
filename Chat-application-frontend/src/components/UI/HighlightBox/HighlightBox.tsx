// HighlightBox.tsx
import "./HighlightBox.css";

interface HighlightBoxProps {
    title?: string;
    content?: string;
    image?: string;
    alt?: string;
    onClick?: () => void;
    width?: string;  // Accepts vw values
}

export default function HighlightBoxes({
                                           title,
                                           content,
                                           image,
                                           alt,
                                           onClick,
                                           width = "25vw"  // Default to viewport width
                                       }: HighlightBoxProps) {
    return (
        <div
            className="highlight-box"
            style={{ maxWidth: width }}
            onClick={onClick}
        >
            {image && (
                <img
                    src={image}
                    alt={alt || title || "Team member"}
                    className="highlight-image"
                />
            )}
            {title && (
                <h3 className="highlight-title">{title}</h3>
            )}
            {content && (
                <p className="highlight-content">{content}</p>
            )}
        </div>
    );
}