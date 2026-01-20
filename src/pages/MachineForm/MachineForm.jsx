import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import Test from "../../assets/test.jpeg";
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
          <h1>Machine {id} – Full Setting Form</h1>

          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={Test}
              alt="Reference"
              className="reference-image"
            />
      
            {/* H.V. Limit input */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "39px",    
                left: "207px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Time 2nd */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "90px",    
                left: "138px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Time 1st */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "90px",    
                left: "208px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Press 2nd */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "120px",    
                left: "148px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Press 1st */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "120px",    
                left: "217px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Ret Vel. */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "156px",    
                left:"180px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Zero Set */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "47px",    
                left:"371px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Mode */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "101px",    
                left:"371px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Flash */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "156px",    
                left:"371px",   
                width: "70px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Flow-Check */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "33px",    
                left:"460px",   
                width: "60px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Fill T.Limit */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "33px",    
                left:"563px",   
                width: "60px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Stages */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "33px",    
                left:"662px",   
                width: "62px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Pos V-P */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "92px",    
                left:"554px",   
                width: "62px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Pos 1st */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "92px",    
                left:"617px",   
                width: "62px",
                height: "30px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Vel V-P */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "122px",    
                left: "563px",   
                width: "62px",
                height: "29px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Vel 1st */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "122px",    
                left: "626px",   
                width: "62px",
                height: "29px",
                border: "2px solid #666",
                background: "#fff",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

            {/* Press */}
            <input
              type="text"
              style={{
                position: "absolute",
                top: "151px",    
                left: "572px",   
                width: "125px",
                height: "29px",
                border: "2px solid #666",
                background: "#FFFFFF",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            />

          </div>
        </div>
      );      
}
