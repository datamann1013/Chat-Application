import "./LandingPage.css";
import ThreeBoxSection from "../components/ThreeBoxSection";
import HeroSection from "../components/HeroSection.tsx";

export default function LandingPage() {
    const heroData = [
        {
            imageUrl: "../public/3Dmodel.jpg",
            title: "Welcome to Our Secure Platform",
            subtitle: "Experience unparalleled security and privacy with our state-of-the-art tools designed for businesses and safety services."
        }
    ];
    const boxData = [
        {
            title: "Secure. Fast. Norwegian.",
            content: "Built and hosted entirely in Norway, our platform targets both casual businesses and high-security sectors. Enjoy privacy-focused chat and file sharing without sacrificing ease of use."
        },
        {
            title: "Encrypted Chat & File Sharing",
            content: "End-to-End Encryption: Your conversations stay between you and those you trust. " +
                "Group Chats & Scheduling: Collaborate in private channels; scheduling is coming soon. "
        },
        {
            title: "Our Mission & Next Steps",
            content: "We’re a student-led project merging strong encryption with a user-friendly interface. " +
                "Future plans include enterprise-scale support, API integrations, and advanced features like 3D modeling. " +
                "All data stays on Norwegian soil."
        }
    ];

    return (
        <div className="landing-page">
            {heroData.map((hero, index) => (
                <HeroSection
                    key={index}
                    imageUrl={hero.imageUrl}
                    title={hero.title}
                    subtitle={hero.subtitle}
                />
            ))}
            <ThreeBoxSection items={boxData} />
        </div>
    );
}
