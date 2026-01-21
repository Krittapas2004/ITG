import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MachineForm from "./pages/MachineForm/MachineForm";
import MachinesRecord from "./pages/MachinesRecord/MachinesRecord";
import MachineSelect from "./pages/MachineSelect/MachineSelect";
import AllPart from "./pages/AllPart/Allpart"

export default function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Route */}
      <Routes>
        <Route path="/" element={< AllPart />} />
        <Route path="/machine-select/:partName" element={< MachineSelect />} />
        <Route path="/machine/:partName/:machineId" element={<MachinesRecord />} />
        <Route path="/machine/:partName/:machineId/form" element={<MachineForm />} />
        <Route path="/machine/:partName/:machineId/record/:recordId" element={<MachineForm />} />

        {/*  
        <Route path="/history" element={<HistoryHome />} />
        <Route path="/history/machine/:id/product/:recordId" element={<RecordDetail />} />
        <Route path="/machine/:id/record/:recordId" element={<RecordDetail />} />
          */}
      </Routes>
    </>
  );
}
