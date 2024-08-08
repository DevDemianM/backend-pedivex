const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const productionOrders = require('./productionOrders');
const products = require('./products');

const productionOrderDetails = sequelize.define('productionOrderDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idProductionOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productionOrders,
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
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'productionOrderDetails',
  timestamps: false
});

module.exports = productionOrderDetails;
