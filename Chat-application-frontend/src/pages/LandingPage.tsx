import "./LandingPage.css";
import React, { useState } from "react";
import ThreeBoxSection from "../components/Sections/Generics/ThreeBoxSection.tsx";
import HeroSection from "../components/Sections/Landingspesific/HeroSection.tsx";
import TeamSection from "../components/Sections/Landingspesific/TeamSection.tsx";
import SignUpSection from "../components/Sections/Generics/SignUpSection.tsx";

import Footer from "../components/Footer";

import LoginModal from "../components/Modals/LoginModal";
import {FeedbackModal} from "../components/Modals/FeedbackModal";
import {NewsletterModal} from "../components/Modals/NewsletterModal";
import Roadmap from "../components/Sections/Landingspesific/Roadmap";



const heroData = [
    {
        imageUrl: "/3Dmodel.jpg",
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
    { name: "Alice", role: "Backend Engineer", image: "../public/placeholderPerson.jpg" },
    { name: "Bob", role: "Frontend Engineer", image: "../public/placeholderPerson.jpg" },
    { name: "Charlie", role: "DevOps Engineer", image: "../public/placeholderPerson.jpg" },
    { name: "Diana", role: "Security Specialist", image: "../public/placeholderPerson.jpg" }

];
const roadmap = [
    { title: "Enterprise-scale support", date: "2024-10-01", implemented: false },
    { title: "API integrations", date: "2023-05-15", implemented: true },
    // ...
];

const LandingPage: React.FC = () => {
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);


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
                onRegisterClick={() => setLoginOpen(true)}
            />

            <ThreeBoxSection items={boxData} heading="Why Choose Our Platform?" />

            <TeamSection
                team={teamMembers}
                mission="We believe in building a robust, secure environment that’s simple to use. Our four-person team combines expertise in backend, frontend, DevOps, and security."
            />

            <Roadmap items={roadmap} />

            <Footer />

            {newsletterOpen && <NewsletterModal onClose={() => setNewsletterOpen(false)} isOpen={newsletterOpen}
                                                children={undefined} />}
            {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} isOpen={feedbackOpen} children={undefined} />}
            {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} isOpen={loginOpen}  initialView="signup" />}
        </div>
    );
};

export default LandingPage;
