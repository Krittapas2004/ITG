import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, doc, setDoc, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore";
import { inputFormat, InputMode } from "../../utility/InputUtil.js";
import { useState, useEffect } from "react";
import Test from "../../assets/worksheet.jpg";
import "./MachineForm.css";

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

  const formFields = [
    { name: 'date', id: 'date-input', type: 'date' },
    { name: 'machine_number', id: 'machine-number-input', type: 'text' },
    { name: 'shift', id: 'shift-input', type: 'text' },
    { name: 'part_name', id: 'part-name-input', type: 'text' },
    { name: 'part_number', id: 'part-number-input', type: 'text' },
    { name: 'material', id: 'material-input', type: 'text' },
    { name: 'temperature', id: 'temperature-input', type: 'text' },
    { name: 'color', id: 'color-input', type: 'text' },
    { name: 'hv_limit', id: 'hv-limit-input', type: 'text', unit: "mm/sec" },
    { name: 'time_4th', id: 'time-4th-input', type: 'text' },
    { name: 'time_3rd', id: 'time-3rd-input', type: 'text' },
    { name: 'time_2nd', id: 'time-2nd-input', type: 'text' },
    { name: 'time_1st', id: 'time-1st-input', type: 'text' },
    { name: 'press_4th', id: 'press-4th-input', type: 'text' },
    { name: 'press_3rd', id: 'press-3rd-input', type: 'text' },
    { name: 'press_2nd', id: 'press-2nd-input', type: 'text' },
    { name: 'press_1st', id: 'press-1st-input', type: 'text' },
    { name: 'ret_vel', id: 'ret-vel-input', type: 'text' },
    { name: 'zero_set', id: 'zero-set-input', type: 'text' },
    { name: 'mode', id: 'mode-input', type: 'text' },
    { name: 'flash', id: 'flash-input', type: 'text' },
    { name: 'flow_check', id: 'flow-check-input', type: 'text' },
    { name: 'fill_t_limit', id: 'fill-t-limit-input', type: 'text' },
    { name: 'stage', id: 'stage-input', type: 'text' },
    { name: 'pos_vp', id: 'pos-vp-input', type: 'text' },
    { name: 'pos_4th', id: 'pos-4th-input', type: 'text' },
    { name: 'pos_3rd', id: 'pos-3rd-input', type: 'text' },
    { name: 'pos_2nd', id: 'pos-2nd-input', type: 'text' },
    { name: 'pos_1st', id: 'pos-1st-input', type: 'text' },
    { name: 'vel_vp', id: 'vel-vp-input', type: 'text' },
    { name: 'vel_4th', id: 'vel-4th-input', type: 'text' },
    { name: 'vel_3rd', id: 'vel-3rd-input', type: 'text' },
    { name: 'vel_2nd', id: 'vel-2nd-input', type: 'text' },
    { name: 'vel_1st', id: 'vel-1st-input', type: 'text' },
    { name: 'fill_press', id: 'fill-press-input', type: 'text' },
    { name: 'dose_delay', id: 'dose-delay-input', type: 'text' },
    { name: 'cool_time', id: 'cool-time-input', type: 'text' },
    { name: 'interval_time', id: 'interval-time-input', type: 'text' },
  ];

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
