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
    unique: {
      msg: ['Ya existe este rol']
    }
  }
}, {
  tableName: 'permissions',
  timestamps: false
});

module.exports = permissions;