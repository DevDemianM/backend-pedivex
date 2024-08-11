const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const devolutionMotives = sequelize.define('devolutionMotives', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'devolutionMotives',
  timestamps: false,
});

module.exports = devolutionMotives;