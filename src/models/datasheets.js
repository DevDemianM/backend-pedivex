const { DataTypes } = require('sequelize');
const db = require('../config/database');
const masses = require('./masses');

const datasheets = db.define('datasheets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
    // idProduct: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: models.Product,
  //     key: 'id',
  //   }
  // },
  idMass: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: masses,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    validate: {
      isAfterStartDate(value) {
        if (value && value < this.startDate) {
          throw new Error('endDate must be greater than startDate');
        }
      },
    },
    defaultValue: [null]
  },
}, {
  tableName: 'datasheets',
  timestamps: false,
});

module.exports = datasheets;
