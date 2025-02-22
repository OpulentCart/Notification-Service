const Notification = require('../models/notification');

// send a notification
module.exports = (io) => {
    sendNotification = async(req, res) => {
        try{
            const { user_id, title, message } = req.body;
            const notification = await Notification.create({
                user_id,
                title,
                message
            });
            io.emit("newNotification", newNotification);
            return res.status(201).json({
                success: true,
                message: "Notification added successfully"
            });
        }catch(error){
            console.error("Error in sending a notification", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed in sending a notification"
            });
        }
    };
}