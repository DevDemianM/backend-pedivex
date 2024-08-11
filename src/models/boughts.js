const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const providers = require('./providers');

const boughts = sequelize.define('boughts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idProvider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: providers,
        key: 'id',
      },
    },
    nroReceipt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
  tableName: 'boughts',
  timestamps: false,
});

module.exports = boughts;