import { Routes, Route, Navigate } from "react-router-dom";
//import Proj0 from "./features/proj0/Proj0.tsx";
//import Proj1 from "./features/proj1/Proj1.tsx";
import Proj2 from "./features/proj2/Proj2.tsx";
import './App.css'
import 'highlight.js/styles/github.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Proj2 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
