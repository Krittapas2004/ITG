import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MachineSelect from "./pages/MachineSelect";
import MachineForm from "./pages/MachineForm";
import MachineHistory from "./pages/MachineHistory";
import RecordDetail from "./pages/RecordDetail";

import HistoryHome from "./pages/HistoryHome";
import MachineHistoryPage from "./pages/MachineHistoryPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<MachineSelect />} />
        <Route path="/machine/:id" element={<MachineForm />} />

        {/* OLD: machine-specific history */}
        <Route path="/machine/:id/history" element={<MachineHistory />} />

        {/* NEW: GLOBAL HISTORY SYSTEM */}
        <Route path="/history" element={<HistoryHome />} />
        <Route path="/history/machine/:id" element={<MachineHistoryPage />} />
        <Route path="/history/machine/:id/product/:recordId" element={<RecordDetail />} />

        {/* OLD RECORD DETAIL STILL WORKS */}
        <Route path="/machine/:id/record/:recordId" element={<RecordDetail />} />
      </Routes>
    </>
  );
}
