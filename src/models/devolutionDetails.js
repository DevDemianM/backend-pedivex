// src/models/DevolutionsDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const products = require('./products');
const devolutions = require('./devolutions');
const devolutionMotives = require('./devolutionMotives');

const devolutionDetails = sequelize.define('devolutionDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: products,
      key: 'id',
    },
  },
  amountProducts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  motive: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: devolutionMotives,
      key: 'id',
    },
  },
  idDevolution: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: devolutions,
      key: 'id',
    },
  },
}, {
  tableName: 'devolutionDetails',
  timestamps: false,
});



module.exports = devolutionDetails;
