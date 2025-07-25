const sequelize = require('../connection');
const RoleModel = require('./roles.model');
const UserModel = require('./users.model');

const Roles = RoleModel(sequelize);
const Users = UserModel(sequelize);

// Associations
Users.belongsTo(Roles, { foreignKey: 'role_id', as: 'roles' });
Roles.hasMany(Users, { foreignKey: 'role_id', as: 'users' });

module.exports = {
  sequelize,
  Roles,
  Users
};
