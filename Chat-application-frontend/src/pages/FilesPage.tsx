import Header from "../components/Header/Header.tsx";
import Footer from "../components/Sections/Generics/Footer.tsx";
import "./FilesPage.css";

export default function FileManagerPage() {
    return (
        <div className="file-manager-page">
            <Header onLoginClick={function(): void {
                throw new Error("Function not implemented.");
            } } />

            <div className="file-manager-container">
                <aside className="fm-sidebar">
                    <div className="sidebar-section">
                        <h3>My Files</h3>
                        <ul>
                            <li className="active">Documents</li>
                            <li>Photos</li>
                            <li>Videos</li>
                            <li>Shared</li>
                            <li>Trash</li>
                        </ul>
                    </div>
                </aside>

                <main className="fm-main">
                    <div className="fm-topbar">
                        <div className="fm-actions">
                            <button className="upload-btn">Upload</button>
                            <button className="new-folder-btn">New Folder</button>
                        </div>
                        <div className="fm-search">
                            <input type="text" placeholder="Search files..." />
                        </div>
                    </div>

                    <div className="fm-files">
                        <div className="fm-files-header">
                            <div className="col-name">Name</div>
                            <div className="col-date">Last Modified</div>
                            <div className="col-size">Size</div>
                        </div>

                        {/* Example file rows */}
                        <div className="fm-file-row">
                            <div className="col-name">Design Specs</div>
                            <div className="col-date">Sep 20, 2025</div>
                            <div className="col-size">1.2 MB</div>
                        </div>
                        <div className="fm-file-row">
                            <div className="col-name">Project Plan</div>
                            <div className="col-date">Sep 18, 2025</div>
                            <div className="col-size">860 KB</div>
                        </div>
                        <div className="fm-file-row">
                            <div className="col-name">Team Photo</div>
                            <div className="col-date">Sep 17, 2025</div>
                            <div className="col-size">2.4 MB</div>
                        </div>
                        {/* ...More rows */}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
