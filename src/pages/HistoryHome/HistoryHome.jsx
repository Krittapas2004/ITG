import { Link } from "react-router-dom";
import "./HistoryHome.css";

export default function HistoryHome() {
    const machines = Array.from({ length: 21 }, (_, i) => i + 1);

    return (
        <div className="history-container">
            <h1 className="history-title">History — Select Machine</h1>

            <div className="machine-grid">
                {machines.map(num => (
                    <Link 
                        key={num} 
                        className="machine-card" 
                        to={`/history/machine/${num}`}
                    >
                        Machine {num}
                    </Link>
                ))}
            </div>
        </div>
    );
}
