const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const roles = require('./roles');

const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: roles,
      key: 'id'
    },
  }
}, {
  tableName: 'users'
});

module.exports = users;