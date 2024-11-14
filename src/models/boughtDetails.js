const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const boughts = require('./boughts');

const boughtDetails = sequelize.define('boughtDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idBought: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: boughts,
      key: 'id',
    },
  },
  supplieName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'boughtDetails',
  timestamps: false,
});

module.exports = boughtDetails;