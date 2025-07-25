const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'Users',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            first_name: {
                type: DataTypes.STRING(30),
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING(20),
                allowNull: true
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(15),
                allowNull: true
            },
            password_hash: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            modified_by: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            modified_date: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );

    return User;
};
