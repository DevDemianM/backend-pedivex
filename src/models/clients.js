// src/models/client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');

const clients = sequelize.define('clients', {
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
  tableName: 'clients',
  timestamps: false,
});

module.exports = clients;
