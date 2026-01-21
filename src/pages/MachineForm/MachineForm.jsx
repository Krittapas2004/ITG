import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
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

    id: "",
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

  async function saveData(e) {
    e.preventDefault();
    await addDoc(collection(db, "all_parts", `all_parts${form.part_name}`, "machines" `machines${form.id}`), {
      ...form,
      createdAt: new Date(),
    });
    alert("Data Saved!");
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
            inputMode="numeric"
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
