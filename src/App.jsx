import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MachineForm from "./pages/MachineForm/MachineForm";
import RecordDetail from "./pages/RecordDetail/RecordDetail";
import HistoryHome from "./pages/HistoryHome/HistoryHome";
import MachineSelect from "./pages/MachineSelect/MachineSelect";
import AllPart from "./pages/AllPart/Allpart"

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={< AllPart/>} />

        
        {/*  
        <Route path="/machine/:id" element={<MachineForm />} />
        <Route path="/history" element={<HistoryHome />} />
        <Route path="/history/machine/:id/product/:recordId" element={<RecordDetail />} />
        <Route path="/machine/:id/record/:recordId" element={<RecordDetail />} />
      */}
      </Routes>
    </>
  );
}
