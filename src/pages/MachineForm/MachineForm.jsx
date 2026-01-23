import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, doc, setDoc, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore";
import { inputFormat, InputMode } from "../../utility/InputUtil.js";
import { useState, useEffect } from "react";
import Test from "../../assets/worksheet.jpg";
import "./MachineForm.css";
import { formFields } from "./formFields";

export default function MachineForm() {
  const { partName, machineId, recordId } = useParams();
  const navigate = useNavigate();
  const decodedPartName = partName ? decodeURIComponent(partName) : "";

  const [form, setForm] = useState({
    date: "",
    machine_number: "",
    shift: "",
    part_name: "",
    part_number: "",
    material: "",
    temperature: "",
    color: "",
    hv_limit: "",
    time_4th: "",
    time_3rd: "",
    time_2nd: "",
    time_1st: "",
    press_4th: "",
    press_3rd: "",
    press_2nd: "",
    press_1st: "",
    ret_vel: "",
    zero_set: "",
    mode: "",
    flash: "",
  });

  useEffect(() => {
    if (decodedPartName && machineId) {
      setForm(prev => ({
        ...prev,
        part_name: decodedPartName,
        machine_number: machineId
      }));

      const fetchData = async () => {
        try {
          let dataToSet = null;

          if (recordId) {
            // Fetch specific history record
            const docRef = doc(
              db,
              "all_part",
              decodedPartName,
              "machines",
              `machine_${machineId}`,
              "history",
              recordId
            );
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dataToSet = docSnap.data();
            }
          } else {
            // Do not fetch latest history. Leave inputs blank for new records.
          }

          if (dataToSet) {
            // Format date for input type="date" (YYYY-MM-DD)
            let formattedDate = "";
            if (dataToSet.date) {
              formattedDate = dataToSet.date;
            }

            setForm(prev => ({
              ...prev,
              ...dataToSet,
              date: formattedDate,
              // Ensure part_name and machine_number stay consistent with URL
              part_name: decodedPartName,
              machine_number: machineId
            }));
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [decodedPartName, machineId, recordId]);

  async function saveData(e) {
    e.preventDefault();

    if (!form.part_name || !form.machine_number) {
      alert("Part Name and Machine Number are required!");
      return;
    }

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

      const machineRef = doc(
        db,
        "all_part",
        form.part_name,
        "machines",
        `machine_${form.machine_number}`
      );

      await setDoc(machineRef, {
        updatedAt: now,
      }, { merge: true });

      await setDoc(docRef, {
        ...form,
        saveTime: timestampId,
        createdAt: now,
      });

      alert(`Saved successfully as: ${timestampId}`);
      navigate(`/machine/${partName}/${machineId}`);
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
      <h1 className="machine-title">Machine – Full Setting Form</h1>
      <div className="form-wrapper">
        <div className="form-canvas">
          <img
            src={Test}
            className="reference-image"
          />
          {formFields.map((field) => (
            <div key={field.id} className="input-group">
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                className="form-input"
                id={field.id}
                name={field.name}
                value={form[field.name]} // Dynamically gets the right value
                onChange={(e) => handleChange(e, InputMode.NO_THAI)}
                disabled={!!recordId}
              />
            </div>
          ))}

          {!recordId && (
            <button className="save-btn" onClick={saveData}>
              Save Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
