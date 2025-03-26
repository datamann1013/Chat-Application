import "./BoxesSection.css";

export default function BoxesSection() {
    return (
        <div className="boxes-container">
            <div className="box">
                <h2>Overview</h2>
                <p>
                    Welcome to our chat and file sharing service. Enjoy secure, fast communication
                    and seamless file transfers.
                </p>
            </div>
            <div className="box">
                <h2>Features</h2>
                <p>
                    Our platform offers real-time chat, secure file uploads, and an integrated experience
                    for effortless collaboration.
                </p>
            </div>
            <div className="box">
                <h2>About</h2>
                <p>
                    Learn more about our mission to provide a unified chat and file sharing solution
                    that prioritizes security and simplicity.
                </p>
            </div>
        </div>
    );
}
