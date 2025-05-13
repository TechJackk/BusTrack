// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const driverRoutes = require("./routes/driverRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
//driverRoutes
//const driverRoutes = require("./routes/driverRoutes");
app.use("/api/driver", driverRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected ✅");

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
        cors: {
            origin: "*", // adjust this later if needed for production
            methods: ["GET", "POST"]
        }
    });

    // Socket.IO connection handler
    io.on("connection", (socket) => {
        console.log("🔌 New socket connection:", socket.id);

        // Listen for driver's location
        socket.on("sendLocation", (data) => {
            console.log("📍 Received location:", data);
            // Broadcast to all connected clients (e.g., passengers)
            io.emit("receiveLocation", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected:", socket.id);
        });
    });

    // Start the server
    server.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

})
.catch((err) => console.error("MongoDB connection error ❌:", err));
