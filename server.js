const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const { connectDB } = require("./config/dbConfig");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

// middleware
app.use(cors());
app.use(express.json());

// connect to the database
connectDB();

// intialize routes with websockets
const notificationRoutes = require("./routes/notificationRoutes")(io);
app.use("/notifications", notificationRoutes);

server.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});

