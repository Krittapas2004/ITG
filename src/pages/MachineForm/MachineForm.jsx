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
            alt="Reference"
            className="reference-image"
          />

          {/* Date */}
          <input
            type="text"
            className="machine-date"
            style={{
              position: "absolute",
              top: "98px",
              left: "131px",
              width: "155px",
              height: "27px",
              border: "2px solid #666",
              background: "#fff",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          />

          {/* Machine Number */}
          <input
            type="text"
            style={{
              position: "absolute",
              top: "98px",
              left: "350px",
              width: "155px",
              height: "27px",
              border: "2px solid #666",
              background: "#fff",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          />

        </div>
      </div>
    </div>
  );
}
