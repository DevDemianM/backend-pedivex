const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RequestDetail = sequelize.define('RequestDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  requestId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productionOrders,
      key: 'id'
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'requestDetail',
  timestamps: false
});

module.exports = RequestDetail;