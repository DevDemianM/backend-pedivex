const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const clients = require('./clients');

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
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: clients,
      key: 'id'
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deadLine: {
    type: DataTypes.DATE,
    allowNull: true
  },
  statusDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'request',
  timestamps: false
});

module.exports = requests;