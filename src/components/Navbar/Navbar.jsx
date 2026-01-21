import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    let backPath = null;

    if (path.startsWith("/machine-select")) {
        backPath = "/";
    } else if (path.includes("/form") || path.includes("/record/")) {
        // /machine/PART/ID/form -> /machine/PART/ID
        // /machine/PART/ID/record/ID -> /machine/PART/ID
        const parts = path.split("/");
        // parts = ["", "machine", "part", "id", ...]
        if (parts.length >= 4) {
            backPath = `/machine/${parts[2]}/${parts[3]}`;
        }
    } else if (path.startsWith("/machine/")) {
        // /machine/PART/ID -> /machine-select/PART
        const parts = path.split("/");
        if (parts.length >= 3) {
            backPath = `/machine-select/${parts[2]}`;
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                {backPath && (
                    <Link to={backPath} className="nav-back-btn">
                        &larr; Back
                    </Link>
                )}
                <Link to="/" className="nav-logo">ITG Machine System</Link>
            </div>
        </nav>
    );
}
