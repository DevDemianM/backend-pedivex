const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const permissions = sequelize.define('permissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  permission: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'permissions'
});

module.exports = permissions;