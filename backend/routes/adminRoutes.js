const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/addRoute", adminController.addRoute);
router.post("/addBus", adminController.addBus);
router.get("/routes", adminController.getAllRoutes);
router.get("/buses", adminController.getAllBuses);
router.get("/findBusByRoute", adminController.findBusByRoute);

module.exports = router;
