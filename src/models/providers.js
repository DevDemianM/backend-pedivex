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
        unique: true
    }
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = providers;