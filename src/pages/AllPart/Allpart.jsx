import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import "../../css/Div.css"
import "../../css/Input.css"
import SearchList from "../../components/SearchList/SearchList.jsx";
import { inputFormat, InputMode } from "../../utility/InputUtil.js";
import "./AllPart.css"

function AllPart() {
    const [parts, setParts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newPartName, setNewPartName] = useState("");

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
        setSearchQuery(inputFormat(e.target.value, InputMode.NO_THAI));
    }

    const handleNewPartChange = (e) => {
        setNewPartName(inputFormat(e.target.value, InputMode.NO_THAI));
    }

    async function addPart() {
        if (!newPartName.trim()) {
            alert("Please enter a part name.");
            return;
        }

        try {
            const partRef = doc(db, "all_part", newPartName);
            const docSnap = await getDoc(partRef);

            if (docSnap.exists()) {
                alert("Part name already exists!");
                return;
            }

            await setDoc(partRef, {
                createdAt: new Date()
            });

            alert(`Part "${newPartName}" added successfully!`);
            setNewPartName(""); // Clear input
        } catch (error) {
            console.error("Error adding part:", error);
            alert("Error adding part. Check console.");
        }
    }

    const filteredParts = parts.filter((part) => {
        const name = part.id?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return name.includes(query);
    });

    return (
        <div className="out-container">
            <div className="add-part">
                <input
                    className="parts-name-input"
                    type="text"
                    value={newPartName}
                    onChange={handleNewPartChange}
                    placeholder="Add Part Name"
                />
                <div className="add-part-button">
                    <button
                        className="add-btn"
                        onClick={addPart}
                    >
                        Add Part
                    </button>
                </div>
            </div>
            {/* Search Bar */}
            <input
                className="parts-name-input"
                type="search"
                value={searchQuery}
                onChange={search}
                placeholder="Search Part Name"
            />

            {/* Search Query List */}

            <div className="parts-list">
                {filteredParts.map((part) => (
                    <div key={part.id} className="part-item">
                        <SearchList
                            partName={part.id}
                        />
                    </div>
                ))}

                {filteredParts.length === 0 && searchQuery !== "" && (
                    <SearchList
                        partName={`No results found for "${searchQuery}"`}
                    />
                )}
            </div>
        </div>
    );
}

export default AllPart;
