const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'roles'
});

module.exports = roles;