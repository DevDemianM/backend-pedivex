const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const masses = sequelize.define('masses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: ['Ya existe este registro']
    }
  },
  notes: {
    type: DataTypes.STRING(500),
    defaultValue: 'sin notas',
  },
}, {
  tableName: 'masses',
  timestamps: false,
});

module.exports = masses;