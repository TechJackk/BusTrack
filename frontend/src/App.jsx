import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import PassengerDashboard from "./pages/PassengerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
