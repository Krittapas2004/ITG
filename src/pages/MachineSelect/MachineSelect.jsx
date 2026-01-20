import { Link } from "react-router-dom";
import "./MachineSelect.css";

export default function MachineSelect() {
    const machines = Array.from({ length: 21 }, (_, i) => i + 1);

    return (
        <div className="home-container">
            <h1 className="home-title">Select Machine</h1>

            <div className="home-grid">
                {machines.map(num => (
                    <Link 
                        key={num}
                        className="home-card"
                        to={`/machine/${num}`}
                    >
                        Machine {num}
                    </Link>
                ))}
            </div>
        </div>
    );
}
