const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const permissions = require('./permissions');
const roles = require('./roles');

const rolePermission = sequelize.define('rolePermission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: roles,
      key: 'id'
    },
  },
  idPermission: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: permissions,
      key: 'id'
    },
  }
}, {
  tableName: 'rolePermission'
});

module.exports = rolePermission;