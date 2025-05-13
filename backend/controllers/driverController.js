const Bus = require("../models/Bus");

// exports.getBuses = async (req, res) => {
//   try{
//     const buses = await Bus.find();
//     res.json(buses);
//   } catch (err) {
//     console.error("Error fetching buses:", err);
//     res.status(500).json({ error: "Failed to fetch buses" });
//   }
// };
exports.getAssignedBuses = async (req, res) => {
  try {
    // Fetch buses assigned to the driver (replace with your logic)
    const buses = await Bus.find(); // Example: Fetch all buses
    res.json(buses);
  } catch (error) {
    console.error("Error fetching assigned buses:", error);
    res.status(500).json({ error: "Failed to fetch assigned buses" });
  }
};
