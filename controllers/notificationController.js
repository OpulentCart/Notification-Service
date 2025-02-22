const Notification = require('../models/notification');

module.exports = (io) => {
    // send a notification
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

    // get notifications for a user
    getUserNotifications = async(req, res) => {
        try{
            const { user_id } = req.body;
            const notifications = await Notification.findAll({ where: { user_id }, order: [["createdAt", "DESC"]] });
            return res.status(200).json({ notifications });
        }catch(error){
            console.error("Error in retreive a notification", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed in retreiving all notification"
            });
        }
    };

}