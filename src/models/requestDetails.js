const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const requests = require('./requests');
const products = require('./products');

const requestDetails = sequelize.define('requestDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRequest: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: requests,
      key: 'id'
    },
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: products,
      key: 'id'
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'requestDetails',
  timestamps: false
});

module.exports = requestDetails;