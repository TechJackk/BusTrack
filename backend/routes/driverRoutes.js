const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

// Route to fetch buses assigned to the driver
router.get("/dBuses", driverController.getAssignedBuses);

module.exports = router;
