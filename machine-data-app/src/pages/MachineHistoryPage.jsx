import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MachineHistoryPage() {
    const { id } = useParams();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function load() {
            const ref = collection(db, "machines", `machine${id}`, "records");
            const snap = await getDocs(ref);

            setRecords(
                snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            );
        }
        load();
    }, [id]);

    return (
        <div className="page">
            <h1>Machine {id} — Product List</h1>

            <Link to="/history">← Back to Machine List</Link>

            <ul className="record-list">
                {records.map(record => (
                    <li key={record.id}>
                        <Link to={`/history/machine/${id}/product/${record.id}`}>
                            {record.product || "Unknown Product"}  
                            <span style={{ opacity: .7 }}>({record.date})</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
