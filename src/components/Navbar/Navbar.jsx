import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-logo">ITG Machine System</Link>
            </div>
        </nav>
    );
}
