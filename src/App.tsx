import { Routes, Route, Navigate } from "react-router-dom";
import Proj0 from "./features/proj0/Proj0.tsx";
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Proj0 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
