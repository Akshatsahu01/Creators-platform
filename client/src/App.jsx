import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route
        path="/dashboard"
        element={
          <Dashboard/>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
