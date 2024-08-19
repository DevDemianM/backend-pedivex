const { Sequelize } = require('sequelize');
const db = require('../config/database');

const User = require('./users');
const Role = require('./roles');
const Permission = require('./permissions');
const RolPermission = require('./rolePermission');
const ProductionOrder = require('./productionOrders');
const ProductionOrderDetail = require('./productionOrderDetails');
const Product = require('./products');
const ProductCategory = require('./productCategories');
const Request = require('./requests');
const RequestDetail = require('./requestDetails');
const Datasheet = require('./datasheets');
const DatasheetDetail = require('./datasheetDetails');
const Mass = require('./masses');
const MassDetail = require('./massDetails');
const Supply = require('./supplies');
const Bought = require('./boughts');
const BoughtDetail = require('./boughtDetails');
const Provider = require('./providers');
const Sale = require('./sales');
const SaleDetail = require('./saleDetails');
const Devolution = require('./devolutions');
const DevolutionDetail = require('./devolutionDetails');
const MotiveDevolution = require('./motiveDevolutions');

// Definición de relaciones
const connectDb = async () => {
  try {

    // Relación entre permission y roles a través de rol_permission
    Role.belongsToMany(Permission, { through: RolPermission, foreignKey: 'idRol' });
    Permission.belongsToMany(Role, { through: RolPermission, foreignKey: 'idPermission' });

    // Relación entre roles y users
    Role.hasMany(User, { foreignKey: 'idRol' });
    User.belongsTo(Role, { foreignKey: 'idRol' });

    // Relación entre users y productionOrders
    User.hasMany(ProductionOrder, { foreignKey: 'idUser' });
    ProductionOrder.belongsTo(User, { foreignKey: 'idUser' });

    // Relación entre productionOrders y productionOrderDetails
    ProductionOrder.hasMany(ProductionOrderDetail, { foreignKey: 'idProductionOrder' });
    ProductionOrderDetail.belongsTo(ProductionOrder, { foreignKey: 'idProductionOrder' });

    // Relación entre products y productionOrderDetails
    Product.hasOne(ProductionOrderDetail, { foreignKey: 'idProduct' });
    ProductionOrderDetail.belongsTo(Product, { foreignKey: 'idProduct' });

    // Relación entre users y requests
    User.hasMany(Request, { foreignKey: 'idUser' });
    Request.belongsTo(User, { foreignKey: 'idUser' });

    // Relación entre requests y requestDetails
    Request.hasMany(RequestDetail, { foreignKey: 'idRequest' });
    RequestDetail.belongsTo(Request, { foreignKey: 'idRequest' });

    // Relación entre productCategories y products
    ProductCategory.hasOne(Product, { foreignKey: 'idCategorie' });
    Product.belongsTo(ProductCategory, { foreignKey: 'idCategorie' });

    // Relación entre products y requestDetails
    Product.hasOne(RequestDetail, { foreignKey: 'idProduct' });
    RequestDetail.belongsTo(Product, { foreignKey: 'idProduct' });

    // Relación entre datasheets y products
    Datasheet.hasMany(Product, { foreignKey: 'idDatasheet' });
    Product.belongsTo(Datasheet, { foreignKey: 'idDatasheet' });

    // Relación entre datasheets y datasheetDetails
    Datasheet.hasMany(DatasheetDetail, { foreignKey: 'idDatasheet' });
    DatasheetDetail.belongsTo(Datasheet, { foreignKey: 'idDatasheet' });

    // Relación entre masses y datasheets
    Mass.hasOne(Datasheet, { foreignKey: 'idMass' });
    Datasheet.belongsTo(Mass, { foreignKey: 'idMass' });

    // Relación entre masses y massDetails
    Mass.hasMany(MassDetail, { foreignKey: 'idMass' });
    MassDetail.belongsTo(Mass, { foreignKey: 'idMass' });

    // Relación entre supplies y datasheetDetails
    Supply.hasOne(DatasheetDetail, { foreignKey: 'idSupplie' });
    DatasheetDetail.belongsTo(Supply, { foreignKey: 'idSupplie' });

    // Relación entre supplies y massDetails
    Supply.hasOne(MassDetail, { foreignKey: 'idSupplie' });
    MassDetail.belongsTo(Supply, { foreignKey: 'idSupplie' });

    // Relación entre boughts y boughtDetails
    Bought.hasMany(BoughtDetail, { foreignKey: 'idBought' });
    BoughtDetail.belongsTo(Bought, { foreignKey: 'idBought' });

    // Relación entre providers y boughts
    Provider.hasOne(Bought, { foreignKey: 'idProvider' });
    Bought.belongsTo(Provider, { foreignKey: 'idProvider' });

    // Relación entre sales y saleDetails
    Sale.hasMany(SaleDetail, { foreignKey: 'idSale' });
    SaleDetail.belongsTo(Sale, { foreignKey: 'idSale' });

    // Relación entre products y saleDetails
    Product.hasOne(SaleDetail, { foreignKey: 'idProduct' });
    SaleDetail.belongsTo(Product, { foreignKey: 'idProduct' });

    // Relación entre users y sales
    User.hasMany(Sale, { foreignKey: 'idUser' });
    Sale.belongsTo(User, { foreignKey: 'idUser' });

    // Relación entre sales y devolutions
    Sale.hasOne(Devolution, { foreignKey: 'idSale' });
    Devolution.belongsTo(Sale, { foreignKey: 'idSale' });

    // Relación entre devolutions y devolutionDetails
    Devolution.hasMany(DevolutionDetail, { foreignKey: 'idDevolution' });
    DevolutionDetail.belongsTo(Devolution, { foreignKey: 'idDevolution' });

    // Relación entre devolutionMotives y devolutionDetails
    MotiveDevolution.hasOne(DevolutionDetail, { foreignKey: 'idMotive' });
    DevolutionDetail.belongsTo(MotiveDevolution, { foreignKey: 'idMotive' });

    await db.sync({ alter: true }); // Sincroniza la base de datos y recrea las tablas
    console.log('BD sincronizada y constraints creados');
  } catch (error) {

    console.error('Error al sincronizar BD ->', error);

  }
};

const models = {
  User,
  Role,
  Permission,
  RolPermission,
  ProductionOrder,
  ProductionOrderDetail,
  Product,
  ProductCategory,
  Request,
  RequestDetail,
  Datasheet,
  DatasheetDetail,
  Mass,
  MassDetail,
  Supply,
  Bought,
  BoughtDetail,
  Provider,
  Sale,
  SaleDetail,
  Devolution,
  DevolutionDetail,
  MotiveDevolution,
}


module.exports = {
  models,
  connectDb
};
