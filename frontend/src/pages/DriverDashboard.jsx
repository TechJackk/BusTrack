import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function DriverDashboard() {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [sharingLocation, setSharingLocation] = useState(false);
  const [busId, setBusId] = useState(""); // Selected busId
  const [buses, setBuses] = useState([]); // List of buses assigned to the driver
  const [loading, setLoading] = useState(true); // Loading state
  const watchIdRef = useRef(null);

  // Fetch buses assigned to the driver
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/driver/dBuses");
        console.log("Buses API Response driver:", res.data); // Log the response
        setBuses(res.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const startTrip = () => {
    if (!busId) {
      alert("Please select a bus before starting the trip.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });

        socket.emit("sendLocation", {
          lat: latitude,
          lng: longitude,
          busId: busId,
          time: new Date().toISOString(),
        });
      },
      (err) => {
        console.error("❌ Geolocation error:", err.message);
        alert("Unable to fetch your location. Please check your device settings.");
      },
      { enableHighAccuracy: true }
    );

    setSharingLocation(true);
  };

  const stopTrip = () => {
    navigator.geolocation.clearWatch(watchIdRef.current);
    setSharingLocation(false);
    setCoords({ lat: null, lng: null });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🚌 Driver Live Tracker</h2>

      {/* Dropdown to select bus */}
      <div className="mb-4">
        <label htmlFor="busId" className="block mb-2 font-semibold">
          Select Bus:
        </label>
        {loading ? (
          <p className="text-gray-500">Loading buses...</p>
        ) : buses.length > 0 ? (
          <select
            id="busId"
            value={busId}
            onChange={(e) => setBusId(e.target.value)} // Set busId to the selected _id
            className="border p-2 rounded w-full"
            >
            <option value="">-- Select Bus --</option>
            {buses.map((bus) => (
                <option key={bus._id} value={bus._id}>
                {bus.busId} - {bus.routeNumber}
                </option>
            ))}
            </select>
        ) : (
          <p className="text-gray-500">No buses.</p>
        )}
      </div>

      {!sharingLocation ? (
        <button
          onClick={startTrip}
          className={`px-4 py-2 rounded ${
            busId
              ? "bg-green-600 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!busId}
        >
          Start Trip
        </button>
      ) : (
        <button
          onClick={stopTrip}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop Trip
        </button>
      )}

      {coords.lat && (
        <p className="mt-4">
          Sending live location: <b>{coords.lat}</b>, <b>{coords.lng}</b>
        </p>
      )}
    </div>
  );
}

export default DriverDashboard;