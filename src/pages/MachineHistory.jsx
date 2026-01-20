import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MachineHistory() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "machines", `machine${id}`, "records"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snapshot => {
      setRecords(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, [id]);

  return (
    <div className="page">
      <h1>Machine {id} — History</h1>

      <Link className="button" to={`/machine/${id}`}>Back to Form</Link>

      <ul className="history-list">
        {records.map(record => (
          <li key={record.id}>
            <Link className="history-item" to={`/machine/${id}/record/${record.id}`}>
              <strong>{record.date || "No Date"}</strong> — {record.product || "No Product"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
