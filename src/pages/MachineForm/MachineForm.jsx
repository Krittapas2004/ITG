import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import Test from "../../assets/worksheet.jpg";
import "./MachineForm.css";

export default function MachineForm() {
  const { id, part_name } = useParams();

  const [form, setForm] = useState({
    hold1Time: "",
    hold2Time: "",
    hold1Press: "",
    hold2Press: "",
    fillPos1: "",
    fillPos2: "",
    fillVel1: "",
    fillVel2: "",
    fillPress: "",
    coolingTime: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveData(e) {
    e.preventDefault();
    await addDoc(collection(db, "all_parts", `all_parts${part_name}`, "machines" `machines${id}`), {
      ...form,
      createdAt: new Date(),
    });
    alert("Data Saved!");
  }

  return (
    <div className="machine-screen">
      <h1>Machine – Full Setting Form</h1>

      <div className="form-wrapper">
        <div className="form-canvas">
          <img
            src={Test}
            className="reference-image"
          />

          {/* Date */}
          <input
            type="text"
            className="long-input"
            id="date-input"
          />

          {/* Machine Number */}
          <input
            type="text"
            className="long-input"
            id="machine-number-input"
          />

        </div>
      </div>
    </div>
  );
}
