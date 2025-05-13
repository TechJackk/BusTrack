import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function PassengerDashboard() {
  const [routes, setRoutes] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [matchedBuses, setMatchedBuses] = useState([]);
  const [busLocations, setBusLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch all routes on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/routes").then((res) => {
      setRoutes(res.data);
    });
  }, []);

  // Fetch buses for selected route
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/findBusByRoute?start=${start}&end=${end}`
      );
      setMatchedBuses(res.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
      setMatchedBuses([]);
    }
  };

  // Handle live location updates
  useEffect(() => {
    const handleLocationUpdate = (data) => {
      setBusLocations((prev) => ({
        ...prev,
        [data.busId]: { lat: data.lat, lng: data.lng, time: data.time },
      }));
    };
    socket.on("receiveLocation", handleLocationUpdate);
    return () => socket.off("receiveLocation", handleLocationUpdate);
  }, []);

  // Center map on selected bus
  const handleBusClick = (busId) => {
    const location = busLocations[busId];
    if (location) {
      setSelectedLocation({ lat: location.lat, lng: location.lng });
    } else {
      alert("Live location for this bus is not available.");
    }
  };

  // Component to center the map
  const CenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 14);
      }
    }, [lat, lng, map]);
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧍 Passenger Dashboard</h2>

      {/* Route Selection */}
      <div className="flex gap-4 mb-4">
        <select
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Start</option>
          {[...new Set(routes.map((r) => r.startPoint))].map((point) => (
            <option key={point} value={point}>
              {point}
            </option>
          ))}
        </select>

        <select
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select End</option>
          {[...new Set(routes.map((r) => r.endPoint))].map((point) => (
            <option key={point} value={point}>
              {point}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Table to display matched buses */}
      {matchedBuses.length > 0 ? (
        <table className="w-full border text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Bus ID</th>
              <th className="p-2 border">Route #</th>
              <th className="p-2 border">Seat Vacancy</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {matchedBuses.map((bus) => (
              <tr key={bus._id}>
                <td className="p-2 border">{bus.busId}</td>
                <td className="p-2 border">{bus.routeNumber}</td>
                <td className="border px-2 py-1 text-center">{bus.seatVacancy}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleBusClick(bus._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:border-2 hover:border-green-400 hover:bg-white hover:text-green-500 transition duration-200 ease-in-out"
                  >
                    Show on Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mb-4">No buses found for the selected route.</p>
      )}

      {/* Live Map */}
      <MapContainer
        center={[13.0827, 80.2707]} // Default center
        zoom={12}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedLocation && <CenterMap lat={selectedLocation.lat} lng={selectedLocation.lng} />}
        {matchedBuses.map((bus) => {
          const loc = busLocations[bus._id];
          return (
            loc && (
              <Marker key={bus._id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <b>Bus:</b> {bus.busId}
                  <br />
                  <b>Route:</b> {bus.routeNumber}
                  <br />
                  <b>Last Updated:</b> {new Date(loc.time).toLocaleTimeString()}
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
    </div>
  );
}

export default PassengerDashboard;