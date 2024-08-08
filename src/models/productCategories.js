const { DataTypes } = require('sequelize');
const db = require('../config/database');

const productCategories = db.define('productCategories', {
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
  tableName: 'productCategories',
  timestamps: false,
});

module.exports = productCategories;
