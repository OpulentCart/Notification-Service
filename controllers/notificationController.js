const Notification = require('../models/notification');

module.exports = (io) => {
    // send a notification
    const sendNotification = async(req, res) => {
        try{
            const { user_id, title, message } = req.body;
            const notification = await Notification.create({
                user_id,
                title,
                message
            });
            io.emit("newNotification", notification);
            return res.status(201).json({
                success: true,
                message: "Notification added successfully"
            });
        }catch(error){
            console.error("Error in sending a notification", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed to send a notification"
            });
        }
    };

    // get notifications for a user
    const getUserNotifications = async(req, res) => {
        try{
            const id = req.user.user_id;
            const notifications = await Notification.findAll({ where: { user_id: id }, order: [["createdAt", "DESC"]] });
            return res.status(200).json({ notifications });
        }catch(error){
            console.error("Error in retreive a notification", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed in retreiving all notification"
            });
        }
    };

    // delete notifications for a user
    const deleteNotifications = async(req, res) => {
        try{
            const { id } = req.body;
            const notifications = await Notification.destroy({ where: { notification_id : id}})
            return res.status(200).json({ 
                success: true,
                message: "Notification deleted succesfully"
            });
        }catch(error){
            console.error("Error in deleting a notification", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed to delete a notification"
            });
        }
    };

    // read notifications
    const readNotifications = async(req, res) => {
        try{
            const id = req.user.user_id;
            const updated = await Notification.update(
                { is_read: true},
                {where: { user_id: id }}
            );
            if (updated[0] === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Notification marked as read"
            });
        }catch(error){
            console.error("Error in marking notification as read:", error.message);
            return res.status(500).json({
                success: false,
                message: "Failed to mark notification as read"
            });
        }
    };

    return {
        sendNotification,
        getUserNotifications,
        deleteNotifications,
        readNotifications
    };
}