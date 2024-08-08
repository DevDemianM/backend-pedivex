const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const clients = require('./clients');

const sales = sequelize.define('sales', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: clients,
      key: 'id',
    },
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }, 
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'sales',
  timestamps: false,
});

module.exports = sales;