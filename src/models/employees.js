// src/models/employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');

const employees = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: users,
      key: 'id'
    },
  }
}, {
  tableName: 'employees',
  timestamps: false,
});

module.exports = employees;
