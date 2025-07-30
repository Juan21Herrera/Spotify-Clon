import { Routes, Route } from "react-router-dom";
import Layout from '../layout/Layout.jsx'
import Home from "./pages/Home";
import PlaylistDetail from "./pages/PlaylistDetail";
import './App.css'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
        </Route>
      </Routes>
  );
}

