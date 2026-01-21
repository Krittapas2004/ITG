import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./MachineSelect.css";

export default function MachineSelect() {
  const { partName } = useParams();
  const decodedPartName = decodeURIComponent(partName);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to the machines subcollection for this specific part
    const machinesRef = collection(db, "all_part", decodedPartName, "machines");

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(machinesRef, (snapshot) => {
      const machineList = snapshot.docs.map(doc => {
        // Extract number from id "machine_1" -> 1
        const id = doc.id;
        const number = parseInt(id.replace("machine_", ""), 10);
        return {
          id: id,
          number: isNaN(number) ? id : number
        };
      });

      // Sort numerically by machine number
      machineList.sort((a, b) => {
        if (typeof a.number === 'number' && typeof b.number === 'number') {
          return a.number - b.number;
        }
        return String(a.number).localeCompare(String(b.number));
      });

      setMachines(machineList);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [decodedPartName]);

  return (
    <div className="home-container">
      <h1 className="home-title">
        Select Machine for {decodedPartName}
      </h1>

      {loading ? (
        <p>Loading machines...</p>
      ) : machines.length === 0 ? (
        <p>No machines found for this part.</p>
      ) : (
        <div className="home-grid">
          {machines.map((machine) => (
            <Link
              key={machine.id}
              className="home-card"
              to={`/machine/${encodeURIComponent(decodedPartName)}/${machine.number}`}
            >
              Machine {machine.number}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
