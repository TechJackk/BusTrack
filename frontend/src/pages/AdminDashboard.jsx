import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./signup.css";

function AdminDashboard() {
  const user = useAuth();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routeForm, setRouteForm] = useState({ routeNumber: "", startPoint: "", endPoint: "" });
  const [busForm, setBusForm] = useState({ busId: "", routeNumber: "", totalSeats: "" });

  // Check if the user is an admin
  if (role !== "Admin") {
    alert("You are not authorized to access this page.");
    navigate("/login");
  }

  const username = user.username;
  console.log("Username:", username);


  // Fetch routes & buses
  const fetchData = async () => {
  const routeRes = await axios.get("http://localhost:5000/api/admin/routes");
  console.log("Routes API Response:", routeRes.data); // Add this line
  const busRes = await axios.get("http://localhost:5000/api/admin/buses");
  setRoutes(routeRes.data);
  setBuses(busRes.data);
};
//   const fetchData = async () => {
//     const routeRes = await axios.get("/api/admin/routes");
//     //console.log(routeRes.data);
//     // Check if the response is an array
//     const busRes = await axios.get("/api/admin/buses");
//     setRoutes(routeRes.data);
//     setBuses(busRes.data);
//   };

  useEffect(() => {
    fetchData();
  }, []);

  // Add Route
  const handleAddRoute = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/admin/addRoute", routeForm);
    setRouteForm({ routeNumber: "", startPoint: "", endPoint: "" });
    fetchData();
  };

  // Add Bus
  const handleAddBus = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/admin/addBus", busForm);
    setBusForm({ busId: "", routeNumber: "", totalSeats: "" });
    fetchData();
  };

  const handleDeleteBus = async (id) => {
  if (window.confirm("Are you sure you want to delete this bus?")) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/buses/${id}`, {
        method: "DELETE",
      });
      alert("bus deleted.");
      setBuses(buses.filter((b) => b._id !== id));
    } catch (err) {
      alert("Failed to delete bus.");
    }
  }
};
  const handleDeleteRoute = async (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/admin/routes/${id}`, {
          method: "DELETE",
        });
        alert("route deleted.");
        setRoutes(routes.filter((r) => r._id !== id));
      } catch (err) {
        alert("Failed to delete route.");
      }
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Welcome {username} 🛠️</h2>

      {/* Add Route Form */}
      <form onSubmit={handleAddRoute} className="mb-6 bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">➕ Add Route</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Route Number"
            value={routeForm.routeNumber}
            onChange={(e) => setRouteForm({ ...routeForm, routeNumber: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Start Point"
            value={routeForm.startPoint}
            onChange={(e) => setRouteForm({ ...routeForm, startPoint: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="End Point"
            value={routeForm.endPoint}
            onChange={(e) => setRouteForm({ ...routeForm, endPoint: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      </form>

      {/* Add Bus Form */}
      <form onSubmit={handleAddBus} className="mb-6 bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">🚌 Add Bus</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Bus ID"
            value={busForm.busId}
            onChange={(e) => setBusForm({ ...busForm, busId: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Route Number"
            value={busForm.routeNumber}
            onChange={(e) => setBusForm({ ...busForm, routeNumber: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Total Seats"
            value={busForm.totalSeats}
            onChange={(e) => setBusForm({ ...busForm, totalSeats: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      </form>

      {/* View Routes Table */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">📍 All Routes</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Route #</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">End</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r, i) => (
              <tr key={i}>
                {console.log("Route:", r)}
                <td className="p-2 border text-center align-middle">{r.routeNumber}</td>
                <td className="p-2 border text-center align-middle">{r.startPoint}</td>
                <td className="p-2 border text-center align-middle">{r.endPoint}</td>
                <td className="p-2 border text-center align-middle">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteRoute(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Buses Table */}
      <div>
        <h3 className="font-semibold mb-2">🚌 All Buses</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Bus ID</th>
              <th className="p-2 border">Route #</th>
              <th className="p-2 border">Seats</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((b, i) => (
              <tr key={i}>
                {console.log("Bus:", b)}
                <td className="p-2 border text-center align-middle">{b.busId}</td>
                <td className="p-2 border text-center align-middle">{b.routeNumber}</td>
                <td className="p-2 border text-center align-middle">{b.totalSeats}</td>
                <td className="p-2 border text-center align-middle">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteBus(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
