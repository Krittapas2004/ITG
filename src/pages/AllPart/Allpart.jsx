import { useEffect, useState } from "react";
import {
    collection,
    doc,
    setDoc,
    onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";
import "../../css/Input.css"
import "../../css/Div.css"
import { inputNoTH } from "../../utility/InputUtil.js";

function AllPart() {
    const [parts, setParts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // 🔹 READ all part names
    useEffect(() => {
        const colRef = collection(db, "all_part");

        const unsub = onSnapshot(colRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
            }));
            setParts(data);
        });

        return () => unsub();
    }, []);

    const search = (e) => {
        setSearchQuery(inputNoTH(e.target.value));
    }

    const filteredParts = parts.filter((part) => {
        const name = part.id?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return name.includes(query);
    });

    return (
        <div id="out-container">
            {/* Search Bar */}

            <input
                id="parts-name-input"
                type="search"
                value={searchQuery}
                onChange={search}
            />

            {/* Search Query List */}

            <div className="parts-list">
                {filteredParts.map((part) => (
                    <div key={part.id} className="part-item">

                        

                        <p>{part.id}</p>
                    </div>
                ))}

                {filteredParts.length === 0 && searchQuery !== "" && (
                    <p>No results found for "{searchQuery}"</p>
                )}
            </div>
        </div>
    );
}

export default AllPart;
