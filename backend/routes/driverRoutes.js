const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const Bus = require("../models/Bus");
const { verifyToken } = require("../middleware/authMiddleware"); // ✅ Correct named import

// Route to fetch buses assigned to the driver
router.get("/dBuses", driverController.getAssignedBuses);

//seat vacancy
router.patch("/updateSeats/:busId" ,async (req, res) => {
  const { vacancy } = req.body;

  try {
    const updated = await Bus.findByIdAndUpdate(
      req.params.busId,
      { seatVacancy: vacancy },
      { new: true }
    );

    res.json({ message: "Updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});

module.exports = router;
