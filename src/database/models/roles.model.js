const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define(
        'Roles',
        {
            role_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: 'roles',
            timestamps: false
        }
    );

    return Role;
};
