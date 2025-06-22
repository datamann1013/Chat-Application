import "./LandingPage.css";
import React, {useState} from "react";
import ThreeBoxSection from "../components/Sections/Generics/ThreeBoxSection.tsx";
import HeroSection from "../components/Sections/Landingspesific/HeroSection.tsx";
import TeamSection from "../components/Sections/Landingspesific/TeamSection.tsx";
import SignUpSection from "../components/Sections/Generics/SignUpSection.tsx";

import Footer from "../components/Sections/Generics/Footer.tsx";

import LoginModal from "../components/Modals/LoginModal";
import {FeedbackModal} from "../components/Modals/FeedbackModal";
import {NewsletterModal} from "../components/Modals/NewsletterModal";


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
    {
        name: "Alice",
        role: "Backend Engineer",
        image: "/placeholderPerson.jpg",
        qualifications: "MSc Computer Science, 5+ years backend experience, expert in Node.js and .NET."
    },
    {
        name: "Bob",
        role: "Frontend Engineer",
        image: "/placeholderPerson.jpg",
        qualifications: "BSc Interaction Design, React specialist, UI/UX enthusiast."
    },
    {
        name: "Charlie",
        role: "DevOps Engineer",
        image: "/placeholderPerson.jpg",
        qualifications: "Certified AWS Solutions Architect, CI/CD automation expert."
    },
    {
        name: "Diana",
        role: "Security Specialist",
        image: "/placeholderPerson.jpg",
        qualifications: "Ethical hacker, OSCP certified, 7+ years in cybersecurity."
    }

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
    const [loginView, setLoginView] = useState<"login" | "signup" | "reset">("login");

    // Open LoginModal in "signup" mode for Register button
    const handleRegisterClick = () => {
        setLoginView("signup");
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

            <NewsletterModal
                onClose={() => setNewsletterOpen(false)}
                isOpen={newsletterOpen}
                children={undefined}
            />
            <FeedbackModal
                onClose={() => setFeedbackOpen(false)}
                isOpen={feedbackOpen}
                children={undefined}
            />
            {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} initialView={loginView} isOpen={loginOpen}
                                      children={null}/>}
        </div>
    );
};

export default LandingPage;