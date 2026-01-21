import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { inputFormat, InputMode } from "../../utility/InputUtil.js";
import { useState } from "react";
import Test from "../../assets/worksheet.jpg";
import "./MachineForm.css";

export default function MachineForm() {
  const [form, setForm] = useState({
    date: "",
    machine_number: "",
    shift: "",
    part_name: "",
    part_number: "",
  });

  async function saveData(e) {
    e.preventDefault();
    const now = new Date();
    const timestampId = now.toLocaleString('sv-SE').replace(' ', '_');

    try {
      const partRef = doc(db, "all_part", form.part_name);
      await setDoc(partRef, {
        updatedAt: now,
      }, { merge: true });

      const docRef = doc(
        db,
        "all_part",
        form.part_name,
        "machines",
        `machine_${form.machine_number}`,
        "history",
        timestampId
      );

      await setDoc(docRef, {
        ...form,
        saveTime: timestampId,
        createdAt: now,
      });

      alert(`Saved successfully as: ${timestampId}`);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data. Check console.");
    }
  }

  function handleChange(e, mode) {
    const { name, value } = e.target;
    const formatted = mode ? inputFormat(value, mode) : value;
    setForm(prev => ({
      ...prev,
      [name]: formatted
    }));
  }

  return (
    <div className="machine-screen">
      <h1>Machine – Full Setting Form</h1>
      <div className="display-grid">
        <button onClick={saveData}></button>
      </div>

      <div className="form-wrapper">
        <div className="form-canvas">
          <img
            src={Test}
            className="reference-image"
          />

          {/* Date Input */}
          <input
            type="date"
            className="form-input"
            id="date-input"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          {/* Machine Number Input */}
          <input
            type="text"
            inputMode="numeric"
            className="form-input"
            id="machine-number-input"
            name="machine_number"
            value={form.machine_number}
            onChange={(e) => handleChange(e, InputMode.ONLY_NUMBER)}
          />

          {/* Shift Input */}
          <input
            type="text"
            className="form-input"
            id="shift-input"
            name="shift"
            value={form.shift}
            onChange={(e) => handleChange(e, InputMode.NO_THAI)}
          />

          {/* Part Name Input */}
          <input
            type="text"
            className="form-input"
            id="part-name-input"
            name="part_name"
            value={form.part_name}
            onChange={(e) => handleChange(e, InputMode.NO_THAI)}
          />

          {/* Part Number Input */}
          <input
            type="text"
            className="form-input"
            id="part-number-input"
            name="part_number"
            value={form.part_number}
            onChange={(e) => handleChange(e, InputMode.NO_THAI)}
          />
        </div>
      </div>
    </div>
  );
}
