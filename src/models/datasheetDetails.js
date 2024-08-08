const { DataTypes } = require('sequelize');
const db = require('../config/database');
const datasheets = require('./datasheets');
const supplies = require('./supplies');

const datasheetDetails = db.define('datasheetDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idDatasheet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: datasheets,
      key: 'id',
    },
  },
  idSupplie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: supplies,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  unit: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      isIn: [['gr', 'ml', 'unit']],
    },
  },
}, {
  tableName: 'datasheetDetails',
  timestamps: false,
});

module.exports = datasheetDetails;
