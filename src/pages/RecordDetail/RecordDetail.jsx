import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./RecordDetail.css";
import html2pdf from "html2pdf.js";

export default function RecordDetail() {
    const { id, recordId } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function load() {
            const ref = doc(db, "machines", `machine${id}`, "records", recordId);
            const snap = await getDoc(ref);
            if (snap.exists()) setData(snap.data());
        }
        load();
    }, [id, recordId]);

    if (!data) return <div className="page">Loading...</div>;

    // ----------------------------
    // PDF EXPORT FUNCTION
    // ----------------------------
    const downloadPDF = () => {
        const element = document.getElementById("pdf-content");
    
        const options = {
            margin: 5,
            filename: `Machine${id}_Record_${recordId}.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] }
        };
    
        html2pdf().set(options).from(element).save();
    };
    

    return (
        <div className="detail-container">
            <h1>Machine {id} — Record Detail</h1>

            <div className="top-buttons">
                <Link to={`/history/machine/${id}`} className="back-link">
                    ← Back to History
                </Link>

                <button className="pdf-btn" onClick={downloadPDF}>
                    📄 Save as PDF
                </button>
            </div>

            {/* CONTENT TO EXPORT */}
            <div id="pdf-content">

                {/* SECTION 1 */}
                <Section title="General Information" fields={{
                    date: data.date,
                    shift: data.shift,
                    product: data.product,
                    productCode: data.productCode,
                    material: data.material,
                    materialTemp: data.materialTemp,
                    color: data.color
                }}/>

                {/* SECTION 2 */}
                <Section title="Clamp Open / Close" fields={{
                    moldClosingPos1: data.moldClosingPos1,
                    moldClosingPos2: data.moldClosingPos2,
                    moldClosingClamp: data.moldClosingClamp,
                    moldClosingSpeed1: data.moldClosingSpeed1,
                    moldClosingSpeed2: data.moldClosingSpeed2,
                    moldClosingSpeedClamp: data.moldClosingSpeedClamp,
                    lowerPressPosition: data.lowerPressPosition,
                    lowerPressPercent: data.lowerPressPercent,
                    moldOpenPos1: data.moldOpenPos1,
                    moldOpenPos2: data.moldOpenPos2,
                    moldOpenPos3: data.moldOpenPos3,
                    moldOpenSpeed1: data.moldOpenSpeed1,
                    moldOpenSpeed2: data.moldOpenSpeed2,
                    moldOpenSpeed3: data.moldOpenSpeed3,
                    takeUpStandby: data.takeUpStandby
                }}/>

                {/* SECTION 3 */}
                <Section title="Ejector" fields={{
                    ejectorOnOff: data.ejectorOnOff,
                    ejectPos1: data.ejectPos1,
                    ejectPos2: data.ejectPos2,
                    ejectPos3: data.ejectPos3,
                    ejectSpeed1: data.ejectSpeed1,
                    ejectSpeed2: data.ejectSpeed2,
                    ejectSpeed3: data.ejectSpeed3,
                    ejectCount: data.ejectCount,
                    ejectInterval: data.ejectInterval
                }}/>

                {/* SECTION 4 */}
                <Section title="Injection" fields={{
                    hold1Time: data.hold1Time,
                    hold1Press: data.hold1Press,
                    hold2Time: data.hold2Time,
                    hold2Press: data.hold2Press,
                    maxFillPressure: data.maxFillPressure,
                    fill1Position: data.fill1Position,
                    fill1Velocity: data.fill1Velocity,
                    fill2Position: data.fill2Position,
                    fill2Velocity: data.fill2Velocity
                }}/>

                {/* SECTION 5 */}
                <Section title="Cooling & Pull Back" fields={{
                    coolingTime: data.coolingTime,
                    interTime: data.interTime,
                    pullPosition: data.pullPosition,
                    pull1: data.pull1,
                    pull2: data.pull2,
                    pullBackC: data.pullBackC
                }}/>

                {/* SECTION 6 */}
                <Section title="Back Pressure" fields={{
                    backPressure1: data.backPressure1,
                    backPressure2: data.backPressure2,
                    rev1: data.rev1,
                    rev2: data.rev2,
                    tempExtra1: data.tempExtra1,
                    tempExtra2: data.tempExtra2
                }}/>

                {/* SECTION 7 */}
                <Section title="Temperature" fields={{
                    nozzle5: data.nozzle5,
                    nozzle4: data.nozzle4,
                    nozzle3: data.nozzle3,
                    nozzle2: data.nozzle2,
                    nozzle1: data.nozzle1,
                    oilTemp: data.oilTemp
                }}/>

                {/* SECTION 8 */}
                <Section title="Supervision" fields={{
                    superOn1: data.superOn1,
                    superOn2: data.superOn2,
                    superOn3: data.superOn3,
                    superOff1: data.superOff1,
                    superOff2: data.superOff2,
                    superOff3: data.superOff3,
                    maxCushion: data.maxCushion,
                    minCushion: data.minCushion,
                    moldProtect: data.moldProtect,
                    cycleTime: data.cycleTime
                }}/>

                {/* SECTION 9 */}
                <Section title="Ejector Detail" fields={{
                    ejectStartMM: data.ejectStartMM,
                    ejectDelaySec: data.ejectDelaySec,
                    ejectTime: data.ejectTime,
                    retractTime: data.retractTime,
                    reEjectTime: data.reEjectTime
                }}/>

            </div>
        </div>
    );
}

/* SECTION COMPONENT */
function Section({ title, fields }) {
    const fieldEntries = Object.entries(fields);

    return (
        <div className="section-card pdf-section">
            <h2 className="pdf-section-title">{title}</h2>

            <table className="pdf-table">
                <tbody>
                    {fieldEntries.map(([key, value], i) => (
                        <tr key={i}>
                            <td className="pdf-label">{formatKey(key)}</td>
                            <td className="pdf-value">{value || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


/* KEY FORMATTER */
function formatKey(key) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^\w/, c => c.toUpperCase());
}
