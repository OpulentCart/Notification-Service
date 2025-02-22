const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Notification = sequelize('Notification', {
    notification_id: {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "auth_app_customuser",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "notifications",
    timestamps: true
});

// sync model with database
sequelize.sync({ alter: true})
    .then(() => {
        console.log("User table created")
    })
    .catch(err => console.error("❌ Error creating User table:", err));
    
module.exports = Notification;