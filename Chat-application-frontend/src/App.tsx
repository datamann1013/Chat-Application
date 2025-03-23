import "./TestPage.css";

export default function TestPage() {
    return (
        <div className="test-page">
            <header className="test-header">
                <h1>Test Page</h1>
            </header>
            <main className="test-content">
                <div className="card">
                    <h2>Card Title</h2>
                    <p>This is a test card with some example text. It should stand out nicely from the background.</p>
                </div>
            </main>
        </div>
    );
}
