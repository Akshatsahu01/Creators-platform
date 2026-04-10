import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Register from "./components/pages/Register";
import CreatePost from "./components/pages/Createpost";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
    </Routes>
  );
}

export default App;