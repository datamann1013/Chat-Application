import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
    const props = {
        imageUrl: "test-image.png",
        title: "Welcome to the Chat App",
        subtitle: "Secure, fast, and modern communication"
    };

    it("renders the image with correct src and alt", () => {
        render(<HeroSection {...props} />);
        const img = screen.getByAltText("3D Model") as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain("test-image.png");
    });

    it("renders the title", () => {
        render(<HeroSection {...props} />);
        expect(screen.getByText(props.title)).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        render(<HeroSection {...props} />);
        expect(screen.getByText(props.subtitle)).toBeInTheDocument();
    });
});
