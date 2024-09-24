const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sales = require('./sales');
const products = require('./products');

const saleDetails = sequelize.define('saleDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idSale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: sales,
      key: 'id'
    }
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: products,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'saleDetails',
  timestamps: false
});



module.exports = saleDetails;
