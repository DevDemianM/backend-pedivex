const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: ['Ya existe este rol']
    }
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = roles;