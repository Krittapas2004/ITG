import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { inputFormat, InputMode } from "../../utility/InputUtil.js";
import { useState, useEffect } from "react";
import Test from "../../assets/worksheet.jpg";
import "./MachineForm.css";
import { formFields } from "./formFields";

export default function MachineForm() {
  const { partName, machineId, recordId } = useParams();
  const navigate = useNavigate();
  const decodedPartName = partName ? decodeURIComponent(partName) : "";
  const initialFormState = formFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    // 1. Always set the part name if it exists in the URL
    if (decodedPartName) {
      setForm(prev => ({
        ...prev,
        part_name: decodedPartName
      }));
    }

    // 2. Set the machine ID if it exists in the URL
    if (machineId) {
      setForm(prev => ({
        ...prev,
        machine_number: machineId
      }));
    }

    // 3. Only attempt to fetch existing data if both identifiers are present
    if (decodedPartName && machineId) {
      const fetchData = async () => {
        try {
          let dataToSet = null;

          if (recordId) {
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
          }

          if (dataToSet) {
            setForm(prev => ({
              ...prev,
              ...dataToSet,
              date: dataToSet.date || "",
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
    const now = new Date();
    const timestampId = now.toLocaleString('sv-SE').replace(' ', '_');

    if (!form.part_name || !form.machine_number) {
      alert("Error: Missing Part Name or Machine Number. Cannot save.");
      return;
    }

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
      navigate(`/machine/${encodeURIComponent(form.part_name)}/${form.machine_number}/record/${timestampId}`);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data. Check console.");
    }
  }

  function handleChange(e, mode) {
    const { name, value } = e.target;
    let formatted = value;

    const upperValue = value.toUpperCase();
    formatted = mode ? inputFormat(upperValue, mode) : value;

    setForm((prev) => ({
      ...prev,
      [name]: formatted,
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

          {formFields.map((field) => {
            let inputElement;

            if (field.type === 'select') {
              inputElement = (
                <select
                  className={field.class}
                  id={field.id}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={(e) => handleChange(e)}
                  disabled={!!recordId}
                >
                  <option value="" disabled>-- Select --</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )
            } else {
              inputElement = (
                <input
                  autoComplete="off"
                  type={field.type}
                  className={field.class}
                  id={field.id}
                  name={field.name}
                  placeholder={""}
                  value={form[field.name] || ""}
                  onChange={(e) => handleChange(e, field.format)}
                  disabled={!!recordId}
                />
              )
            }

            return (
              <div key={field.id} className="input-group">
                <label htmlFor={field.id}>{field.label}</label>
                {inputElement}
              </div>
            );
          })}


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
