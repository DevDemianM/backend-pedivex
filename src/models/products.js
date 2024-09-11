const { DataTypes } = require('sequelize');
const db = require('../config/database');
const datasheets = require('./datasheets');
const productCategories = require('./productCategories');

const products = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idDatasheet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: datasheets,
      key: 'id',
    },
  },
  idCategorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productCategories,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: ['Ya existe este registro']
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image: {
    type: DataTypes.STRING(5000),
    allowNull: false,
  },
  // inCatalogue: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: true
  // },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = products;
