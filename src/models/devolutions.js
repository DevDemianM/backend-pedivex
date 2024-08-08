const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const clients = require('./clients');
const sales = require('./sales');

const devolutions = sequelize.define('devolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  voucher: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: clients ,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quantityProducts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idSale: {
    type: DataTypes.INTEGER,
    references: {
      model: sales,
      key: 'id',
    },
  },
}, {
  tableName: 'devolutions',
  timestamps: false,
});



module.exports = devolutions;
