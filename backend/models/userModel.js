const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ["Admin", "Driver", "Passenger"], default: "Passenger" }
});

module.exports = mongoose.model("User", userSchema);
