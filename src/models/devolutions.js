const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Devolutions = sequelize.define('Devolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idSale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sales',  // Referencia por nombre
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idMotive: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'motiveDevolutions',  // Referencia por nombre
      key: 'id'
    }
  }
}, {
  tableName: 'devolutions',
  timestamps: false,
});

module.exports = Devolutions;