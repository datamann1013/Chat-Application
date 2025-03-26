import "./LandingPage.css";
import React, { useState } from "react";
import ThreeBoxSection from "../components/Sections/ThreeBoxSection";
import HeroSection from "../components/Sections/HeroSection";
import LoginModal from "../components/Modals/LoginModal";
import FeedbackModal from "../components/Modals/FeedbackModal";
import NewsletterModal from "../components/Modals/NewsletterModal";
import Footer from "../components/Footer";
import TeamSection from "../components/Sections/TeamSection";
import SignUpSection from "../components/Sections/SignUpSection";

const heroData = [
    {
        imageUrl: "../public/3Dmodel.jpg",
        title: "Welcome to Our Secure Platform",
        subtitle:
            "Experience unparalleled security and privacy with our state-of-the-art tools designed for businesses and safety services.",
    },
];

const boxData = [
    {
        title: "Secure. Fast. Norwegian.",
        content:
            "Built and hosted entirely in Norway, our platform targets both casual businesses and high-security sectors. Enjoy privacy-focused chat and file sharing without sacrificing ease of use.",
    },
    {
        title: "Encrypted Chat & File Sharing",
        content:
            "End-to-End Encryption: Your conversations stay between you and those you trust. " +
            "Group Chats & Scheduling: Collaborate in private channels; scheduling is coming soon. ",
    },
    {
        title: "Our Mission & Next Steps",
        content:
            "We’re a student-led project merging strong encryption with a user-friendly interface. " +
            "Future plans include enterprise-scale support, API integrations, and advanced features like 3D modeling. " +
            "All data stays on Norwegian soil.",
    },
];

const teamMembers = [
    { name: "Alice", role: "Backend Engineer" },
    { name: "Bob", role: "Frontend Engineer" },
    { name: "Charlie", role: "DevOps Engineer" },
    { name: "Diana", role: "Security Specialist" },
];

const roadmap = [
    "Enterprise-scale support",
    "API integrations",
    "Advanced 3D modeling features",
    "End-to-end encryption enhancements",
];

const LandingPage: React.FC = () => {
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    // We want to open the LoginModal in "signup" mode
    // For simplicity, let's just open it normally:
    const handleRegisterClick = () => {
        setLoginOpen(true);
    };

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

            <SignUpSection
                onNewsletterClick={() => setNewsletterOpen(true)}
                onFeedbackClick={() => setFeedbackOpen(true)}
                onRegisterClick={handleRegisterClick}
            />

            <ThreeBoxSection items={boxData} heading="Why Choose Our Platform?" />

            <TeamSection
                team={teamMembers}
                mission="We believe in building a robust, secure environment that’s simple to use. Our four-person team combines expertise in backend, frontend, DevOps, and security."
                roadmap={roadmap}
                onFeedbackClick={() => setFeedbackOpen(true)}
            />

            <Footer />

            {newsletterOpen && <NewsletterModal onClose={() => setNewsletterOpen(false)} />}
            {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
            {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
        </div>
    );
};

export default LandingPage;
