const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');

const productionOrders = sequelize.define('productionOrders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING(400),
    allowNull: true
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: users,  
        key: 'id'        
    },
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'productionOrders',
  timestamps: false
});

module.exports = productionOrders;

