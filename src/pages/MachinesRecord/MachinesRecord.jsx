import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./MachinesRecord.css";

export default function MachinesRecord() {
    const { partName, machineId } = useParams();
    const decodedPartName = decodeURIComponent(partName);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}-${month}-${year}`;
        }
        return dateStr;
    };

    useEffect(() => {
        const historyRef = collection(
            db,
            "all_part",
            decodedPartName,
            "machines",
            `machine_${machineId}`,
            "history"
        );

        const q = query(historyRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const historyData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecords(historyData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [decodedPartName, machineId]);

    return (
        <div className="record-container">
            <div className="record-header">
                <h1>{decodedPartName} - Machine {machineId}</h1>
            </div>

            {loading ? (
                <p>Loading history...</p>
            ) : records.length === 0 ? (
                <p className="no-records">No history found for this machine.</p>
            ) : (
                <div className="record-list">
                    {records.map((record) => (
                        <Link
                            key={record.id}
                            to={`/machine/${partName}/${machineId}/record/${record.id}`}
                            className="record-card-link"
                        >
                            <div className="record-card">
                                <div className="record-info">
                                    <h3>Date: {formatDate(record.date)}</h3>
                                    <p>Shift: {record.shift || "-"}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
