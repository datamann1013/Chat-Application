import "./LandingPage.css";
import ThreeBoxSection from "../components/ThreeBoxSection";

export default function LandingPage() {
    const boxData = [
        {
            title: "Secure. Fast. Norwegian.",
            content: "Welcome to our chat and file sharing service. Enjoy secure, fast communication and seamless file transfers."
        },
        {
            title: "Features",
            content: "Our platform offers real-time chat, secure file uploads, and an integrated experience for effortless collaboration."
        },
        {
            title: "About",
            content: "Learn more about our mission to provide a unified chat and file sharing solution that prioritizes security and simplicity."
        }
    ];

    return (
        <div className="landing-page">
            {/* You can add a hero/banner section above if desired */}
            <ThreeBoxSection items={boxData} />
        </div>
    );
}
