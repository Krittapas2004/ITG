import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function MachineForm() {
    const { id } = useParams();

    const [form, setForm] = useState({
        // SECTION 1 — GENERAL INFO
        date: "",
        machineNumber: id,
        shift: "",
        product: "",
        productCode: "",
        material: "",
        materialTemp: "",
        color: "",

        // SECTION 2 — CLAMP OPEN CLOSE
        moldClosingPos1: "",
        moldClosingPos2: "",
        moldClosingClamp: "",
        moldClosingSpeed1: "",
        moldClosingSpeed2: "",
        moldClosingSpeedClamp: "",

        lowerPressPosition: "",
        lowerPressPercent: "",

        moldOpenPos1: "",
        moldOpenPos2: "",
        moldOpenPos3: "",
        moldOpenSpeed1: "",
        moldOpenSpeed2: "",
        moldOpenSpeed3: "",

        takeUpStandby: "",
        takeUpCount: "",
        takeUpInterval: "",

        // SECTION 3 — EJECTOR
        ejectorOnOff: "",
        ejectPos1: "",
        ejectPos2: "",
        ejectPos3: "",
        ejectSpeed1: "",
        ejectSpeed2: "",
        ejectSpeed3: "",
        ejectCount: "",
        ejectInterval: "",

        // SECTION 4 — INJECTION & COOLING
        coolingTime: "",
        interTime: "",
        pullback1: "",
        pullback2: "",
        pullbackC: "",
        backPressure1: "",
        backPressure2: "",
        rev1: "",
        rev2: "",
        unknownTemp1: "",
        unknownTemp2: "",

        // SECTION 5 — TEMPERATURE
        nozzle4: "",
        nozzle3: "",
        nozzle2: "",
        nozzle1: "",
        extra1: "",
        extra2: "",
        oilTemp: "",

        // SECTION 6 — SUPERVISION
        superOn1: "",
        superOn2: "",
        superOn3: "",
        superOff1: "",
        superOff2: "",
        superOff3: "",
        maxCushion: "",
        minCushion: "",
        moldProtect: "",
        cycleTime: "",

        // SECTION 7 — EJECTOR DETAIL
        ejectStartMM: "",
        ejectDelaySec: "",
        ejectTime: "",
        retractTime: "",
        reEjectTime: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function saveData(e) {
        e.preventDefault();
        await addDoc(collection(db, "machines", `machine${id}`, "records"), {
            ...form,
            createdAt: new Date()
        });
        alert("Data Saved!");
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Machine {id} – Full Setting Form</h1>

            <form onSubmit={saveData}>

                {/* SECTION 1 — GENERAL INFO */}
                <h2>General Information</h2>
                <input name="date" placeholder="วันที่" onChange={handleChange} />
                <input name="shift" placeholder="กะ" onChange={handleChange} />
                <input name="product" placeholder="สินค้า" onChange={handleChange} />
                <input name="productCode" placeholder="รหัสสินค้า" onChange={handleChange} />
                <input name="material" placeholder="วัตถุดิบ" onChange={handleChange} />
                <input name="materialTemp" placeholder="อุณหภูมิ" onChange={handleChange} />
                <input name="color" placeholder="สี" onChange={handleChange} />

                {/* SECTION 2 — CLAMP */}
                <h2>Clamp Open / Close</h2>

                <h3>Mold Closing</h3>
                <input name="moldClosingPos1" placeholder="Position 1st" onChange={handleChange} />
                <input name="moldClosingPos2" placeholder="Position 2nd" onChange={handleChange} />
                <input name="moldClosingClamp" placeholder="Clamp Position" onChange={handleChange} />
                <input name="moldClosingSpeed1" placeholder="Speed 1st" onChange={handleChange} />
                <input name="moldClosingSpeed2" placeholder="Speed 2nd" onChange={handleChange} />
                <input name="moldClosingSpeedClamp" placeholder="Clamp Speed" onChange={handleChange} />

                <h3>Lower Press Clamp</h3>
                <input name="lowerPressPosition" placeholder="Position mm" onChange={handleChange} />
                <input name="lowerPressPercent" placeholder="Press %" onChange={handleChange} />

                <h3>Mold Open Limit</h3>
                <input name="moldOpenPos1" placeholder="Position 1" onChange={handleChange} />
                <input name="moldOpenPos2" placeholder="Position 2" onChange={handleChange} />
                <input name="moldOpenPos3" placeholder="Position 3" onChange={handleChange} />
                <input name="moldOpenSpeed1" placeholder="Speed 1" onChange={handleChange} />
                <input name="moldOpenSpeed2" placeholder="Speed 2" onChange={handleChange} />
                <input name="moldOpenSpeed3" placeholder="Speed 3" onChange={handleChange} />

                <h3>Take Up Equipment</h3>
                <input name="takeUpStandby" placeholder="Standby mm" onChange={handleChange} />

                {/* SECTION 3 — EJECTOR */}
                <h2>Ejector</h2>

                <input name="ejectorOnOff" placeholder="ON/OFF" onChange={handleChange} />

                <h3>Retract Ejector</h3>
                <input name="ejectPos1" placeholder="POS 1" onChange={handleChange} />
                <input name="ejectPos2" placeholder="POS 2" onChange={handleChange} />
                <input name="ejectPos3" placeholder="POS 3" onChange={handleChange} />
                <input name="ejectSpeed1" placeholder="Speed 1" onChange={handleChange} />
                <input name="ejectSpeed2" placeholder="Speed 2" onChange={handleChange} />
                <input name="ejectSpeed3" placeholder="Speed 3" onChange={handleChange} />

                <input name="ejectCount" placeholder="Eject Count" onChange={handleChange} />
                <input name="ejectInterval" placeholder="Interval sec" onChange={handleChange} />

                {/* SECTION 4 — INJECTION */}
                <h2>Injection</h2>

                <h3>Hold Pressure</h3>
                <label>1st Time (sec)</label>
                <input name="hold1Time" onChange={handleChange} />

                <label>1st Press (%)</label>
                <input name="hold1Press" onChange={handleChange} />

                <label>2nd Time (sec)</label>
                <input name="hold2Time" onChange={handleChange} />

                <label>2nd Press (%)</label>
                <input name="hold2Press" onChange={handleChange} />

                <h3>Max Fill Pressure</h3>
                <input name="maxFillPressure" placeholder="%" onChange={handleChange} />

                <h3>Filling</h3>
                <label>1st Position (mm)</label>
                <input name="fill1Position" onChange={handleChange} />

                <label>1st Velocity (%)</label>
                <input name="fill1Velocity" onChange={handleChange} />

                <label>2nd Position (mm)</label>
                <input name="fill2Position" onChange={handleChange} />

                <label>2nd Velocity (%)</label>
                <input name="fill2Velocity" onChange={handleChange} />

                {/* COOLING */}
                <h2>Cooling</h2>
                <label>Cooling Time (sec)</label>
                <input name="coolingTime" onChange={handleChange} />

                <label>INTER (sec)</label>
                <input name="interTime" onChange={handleChange} />

                {/* PULL BACK */}
                <h3>Pull Back</h3>

                <label>Position</label>
                <input name="pullPosition" placeholder="Position mm" onChange={handleChange} />

                <label>1st (mm)</label>
                <input name="pull1" onChange={handleChange} />

                <label>2nd (mm)</label>
                <input name="pull2" onChange={handleChange} />

                <h3>Pull Back C</h3>
                <input name="pullBackC" placeholder="0.50" onChange={handleChange} />

                {/* BACK PRESSURE */}
                <h3>Back Pressure</h3>

                <label>Pressure 1 (%)</label>
                <input name="backPressure1" onChange={handleChange} />

                <label>Pressure 2 (%)</label>
                <input name="backPressure2" onChange={handleChange} />

                <label>REV 1 (%)</label>
                <input name="rev1" onChange={handleChange} />

                <label>REV 2 (%)</label>
                <input name="rev2" onChange={handleChange} />

                {/* EXTRA TEMPERATURE BOXES */}
                <h3>Extra Temps</h3>
                <label>Temp 1 (°C)</label>
                <input name="tempExtra1" onChange={handleChange} />

                <label>Temp 2 (°C)</label>
                <input name="tempExtra2" onChange={handleChange} />

                {/* SECTION 5 — TEMPERATURE */}
                <h2>Temperature</h2>
                <input name="nozzle5" placeholder="Nozzle 5" onChange={handleChange} />
                <input name="nozzle4" placeholder="Nozzle 4" onChange={handleChange} />
                <input name="nozzle3" placeholder="Nozzle 3" onChange={handleChange} />
                <input name="nozzle2" placeholder="Nozzle 2" onChange={handleChange} />
                <input name="nozzle1" placeholder="Nozzle 1" onChange={handleChange} />
                <input name="oilTemp" placeholder="Oil Temp" onChange={handleChange} />

                {/* SECTION 6 — SUPERVISION */}
                <h2>Supervision</h2>
                <input name="superOn1" placeholder="Super ON 1" onChange={handleChange} />
                <input name="superOn2" placeholder="Super ON 2" onChange={handleChange} />
                <input name="superOn3" placeholder="Super ON 3" onChange={handleChange} />
                <input name="superOff1" placeholder="Super OFF 1" onChange={handleChange} />
                <input name="superOff2" placeholder="Super OFF 2" onChange={handleChange} />
                <input name="superOff3" placeholder="Super OFF 3" onChange={handleChange} />
                <input name="maxCushion" placeholder="Max Cushion" onChange={handleChange} />
                <input name="minCushion" placeholder="Min Cushion" onChange={handleChange} />
                <input name="moldProtect" placeholder="Mold Protect" onChange={handleChange} />
                <input name="cycleTime" placeholder="Cycle Time" onChange={handleChange} />

                {/* SECTION 7 — EJECTOR DETAIL */}
                <h2>Ejector Detail</h2>
                <input name="ejectStartMM" placeholder="Eject Start mm" onChange={handleChange} />
                <input name="ejectDelaySec" placeholder="Eject Delay sec" onChange={handleChange} />
                <input name="ejectTime" placeholder="Eject Time sec" onChange={handleChange} />
                <input name="retractTime" placeholder="Retract Time sec" onChange={handleChange} />
                <input name="reEjectTime" placeholder="Re-Eject Time sec" onChange={handleChange} />

                <br /><br />
                <button type="submit">Save All Data</button>
            </form>
        </div>
    );
}
