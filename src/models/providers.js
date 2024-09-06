const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const providers = sequelize.define('providers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: ['Ya existe este registro']
        }
    }
}, {
  tableName: 'providers',
  timestamps: false,
});

module.exports = providers;