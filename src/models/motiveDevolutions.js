const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const motiveDevolutions = sequelize.define('motiveDevolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'motiveDevolutions',
  timestamps: false,
});

module.exports = motiveDevolutions;