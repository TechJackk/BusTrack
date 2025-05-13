const Route = require("../models/Route");
const Bus = require("../models/Bus");

exports.addRoute = async (req, res) => {
  const { routeNumber, startPoint, endPoint } = req.body;
  try {
    const newRoute = new Route({ routeNumber, startPoint, endPoint });
    await newRoute.save();
    res.status(201).json({ message: "Route added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding route" });
  }
};

exports.addBus = async (req, res) => {
  const { busId, routeNumber, totalSeats } = req.body;
  try {
    // Find the route by routeNumber
    const route = await Route.findOne({ routeNumber });
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }
    const routeId = route._id;
    // Create a new bus with a reference to the route
    const newBus = new Bus({ busId, routeId, routeNumber,totalSeats });
    await newBus.save();
    res.status(201).json({ message: "Bus added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding bus" });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    // Populate the route field with details from the Route model
    const buses = await Bus.find().populate("route");
    res.json(buses);
  } catch (err) {
    console.error("Error fetching buses:", err);
    res.status(500).json({ error: "Failed to fetch buses" });
  }
};

exports.findBusByRoute = async (req, res) => {
  const { start, end } = req.query; // Get start and end points from query parameters

  try {
    // Find the route that matches the start and end points
    const route = await Route.findOne({ startPoint: start, endPoint: end });
    if (!route) {
      return res.status(404).json({ error: "No route found for the given start and end points" });
    }

    // Find buses associated with the routeNumber
    const buses = await Bus.find({ routeNumber: route.routeNumber });
    if (buses.length === 0) {
      return res.status(404).json({ error: "No buses found for the given route" });
    }

    res.json(buses); // Return the buses
  } catch (err) {
    console.error("Error finding buses:", err);
    res.status(500).json({ error: "Failed to find buses" });
  }
};
