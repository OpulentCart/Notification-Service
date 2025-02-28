const express = require("express");
const router = express.Router();
const initNotificationController = require("../controllers/notificationController");
const authenticateUser  = require("../middleware/authMiddleware");

module.exports = (io) => {
    const notificationController = initNotificationController(io);
    console.log("Notification Controller:", notificationController);
    router.post("/", authenticateUser, notificationController.sendNotification);
    router.get("/", authenticateUser, notificationController.getUserNotifications);
    router.put("/", authenticateUser, notificationController.readNotifications);
    router.delete("/", authenticateUser, notificationController.deleteNotifications);

    return router;
};