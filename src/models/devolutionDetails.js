const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Devolutions = require('./devolutions');
const Products = require('./products');
const MotiveDevolutions = require('./motiveDevolutions');

const DevolutionDetails = sequelize.define('DevolutionDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  idDevolution: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Devolutions,
      key: 'id',
    },
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idMotive: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MotiveDevolutions,
      key: 'id',
    },
  },
  changedProduct: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Products,
      key: 'id',
    },
  },
  changedQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'devolutionDetails',
  timestamps: false,
});

module.exports = DevolutionDetails;
