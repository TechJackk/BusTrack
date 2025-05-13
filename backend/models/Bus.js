const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" }, // Reference to Route model
  routeNumber: { type: String, required: true },
  totalSeats: { type: Number, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
