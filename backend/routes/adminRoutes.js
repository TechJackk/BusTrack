const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const Route = require("../models/Route");
const Bus = require("../models/Bus");

router.post("/addRoute", adminController.addRoute);
router.post("/addBus", adminController.addBus);
router.get("/routes", adminController.getAllRoutes);
router.get("/buses", adminController.getAllBuses);
router.get("/findBusByRoute", adminController.findBusByRoute);

router.delete("/buses/:id", async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bus" });
  }
});

// DELETE route
router.delete("/routes/:id", async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Route deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting route" });
  }
});

module.exports = router;
