import { Link } from 'react-router-dom';
import './SearchList.css'; // อย่าลืม import ไฟล์ CSS

export default function SearchList({ partName }) {
    return (
        <Link
            to={`/machine-select/${partName || 'unknown'}`}
            className="search-link"
        >
            <div className="search-card">
                <p className="search-content">
                    {partName}
                </p>
            </div>
        </Link>
    );
}