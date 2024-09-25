const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');

const requests = sequelize.define('requests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: users,
      key: 'id'
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 4,
  },
  deadLine: {
    type: DataTypes.DATE,
    allowNull: true
  },
  stateDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'request',
  timestamps: false
});

module.exports = requests;