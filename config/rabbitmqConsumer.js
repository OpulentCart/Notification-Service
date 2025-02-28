const amqp = require("amqplib");
const Notification = require("../models/notification");

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME="notifications";


const consumeNotifications = async (io) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log("🚀 RabbitMQ Consumer is listening for notifications...");

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const notificationData = JSON.parse(msg.content.toString());
                console.log("📩 Received Notification:", notificationData);

                // Save notification to the database
                const notification = await Notification.create(notificationData);

                // Emit notification to WebSocket clients
                io.emit("newNotification", notification);

                // Acknowledge message
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
};

module.exports = consumeNotifications;