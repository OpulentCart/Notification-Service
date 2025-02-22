const express = require("express");
const router = express.Router();
const initNotificationController = require("../controllers/notificationController");

module.exports = (io) => {
    const notificationController = initNotificationController(io);

    router.post("/", notificationController.sendNotification);
    router.get("/:id", notificationController.getUserNotifications);

    return router;
};