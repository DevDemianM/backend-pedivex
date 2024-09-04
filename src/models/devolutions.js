const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MotiveDevolutions = require('./motiveDevolutions');
const Sales = require('./sales');

const Devolutions = sequelize.define('Devolutions', {
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
      model: Sales,  // Referencia por nombre
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'devolutions',
  timestamps: false,
});

module.exports = Devolutions;