const { DataTypes } = require('sequelize');
const db = require('../config/database');

const states = db.define('states', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'states',
  timestamps: false,
});

module.exports = states;
