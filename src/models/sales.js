const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');

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
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: users,
      key: 'id'
    },
  },
}, {
  tableName: 'sales',
  timestamps: false,
});

module.exports = sales;