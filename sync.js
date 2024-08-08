// const sequelize = require('./src/config/database');
// const {
//   permissions,
//   roles,
//   users,
//   employees,
//   clients,
//   productionOrders,
//   productionOrderDetails,
//   products,
//   productCategories,
//   requests,
//   requestDetails,
//   datasheets,
//   datasheetDetails,
//   masses,
//   massDetails,
//   supplies,
//   boughts,
//   boughtDetails,
//   providers,
//   sales,
//   saleDetails,
//   devolutions,
//   devolutionDetails,
//   devolutionMotives,
//   rolePermissions
// } = require('./src/models'); // Asegúrate de ajustar la ruta según tu estructura de directorios

// // Definición de las relaciones
// roles.belongsToMany(permissions, { through: rolePermissions, foreignKey: 'idRole' });
// permissions.belongsToMany(roles, { through: rolePermissions, foreignKey: 'idPermission' });

// roles.hasMany(users, { foreignKey: 'idRol' });
// users.belongsTo(roles, { foreignKey: 'idRol' });

// users.hasOne(employees, { foreignKey: 'idUser' });
// employees.belongsTo(users, { foreignKey: 'idUser' });

// users.hasOne(clients, { foreignKey: 'idUser' });
// clients.belongsTo(users, { foreignKey: 'idUser' });

// employees.hasMany(productionOrders, { foreignKey: 'idEmployee' });
// productionOrders.belongsTo(employees, { foreignKey: 'idEmployee' });

// productionOrders.hasMany(productionOrderDetails, { foreignKey: 'idProductionOrder' });
// productionOrderDetails.belongsTo(productionOrders, { foreignKey: 'idProductionOrder' });

// products.hasOne(productionOrderDetails, { foreignKey: 'idProduct' });
// productionOrderDetails.belongsTo(products, { foreignKey: 'idProduct' });

// clients.hasMany(requests, { foreignKey: 'idClient' });
// requests.belongsTo(clients, { foreignKey: 'idClient' });

// requests.hasMany(requestDetails, { foreignKey: 'idRequest' });
// requestDetails.belongsTo(requests, { foreignKey: 'idRequest' });

// productCategories.hasOne(products, { foreignKey: 'idCategorie' });
// products.belongsTo(productCategories, { foreignKey: 'idCategorie' });

// products.hasOne(requestDetails, { foreignKey: 'idProduct' });
// requestDetails.belongsTo(products, { foreignKey: 'idProduct' });

// datasheets.hasMany(products, { foreignKey: 'idDatasheet' });
// products.belongsTo(datasheets, { foreignKey: 'idDatasheet' });

// datasheets.hasMany(datasheetDetails, { foreignKey: 'idDatasheet' });
// datasheetDetails.belongsTo(datasheets, { foreignKey: 'idDatasheet' });

// masses.hasOne(datasheets, { foreignKey: 'idMass' });
// datasheets.belongsTo(masses, { foreignKey: 'idMass' });

// masses.hasMany(massDetails, { foreignKey: 'idMass' });
// massDetails.belongsTo(masses, { foreignKey: 'idMass' });

// supplies.hasOne(datasheetDetails, { foreignKey: 'idSupplie' });
// datasheetDetails.belongsTo(supplies, { foreignKey: 'idSupplie' });

// supplies.hasOne(massDetails, { foreignKey: 'idSupplie' });
// massDetails.belongsTo(supplies, { foreignKey: 'idSupplie' });

// boughts.hasMany(boughtDetails, { foreignKey: 'idBought' });
// boughtDetails.belongsTo(boughts, { foreignKey: 'idBought' });

// providers.hasOne(boughts, { foreignKey: 'idProvider' });
// boughts.belongsTo(providers, { foreignKey: 'idProvider' });

// sales.hasMany(saleDetails, { foreignKey: 'idSale' });
// saleDetails.belongsTo(sales, { foreignKey: 'idSale' });

// products.hasOne(saleDetails, { foreignKey: 'idProduct' });
// saleDetails.belongsTo(products, { foreignKey: 'idProduct' });

// clients.hasMany(sales, { foreignKey: 'idClient' });
// sales.belongsTo(clients, { foreignKey: 'idClient' });

// sales.hasOne(devolutions, { foreignKey: 'idSale' });
// devolutions.belongsTo(sales, { foreignKey: 'idSale' });

// devolutions.hasMany(devolutionDetails, { foreignKey: 'idDevolution' });
// devolutionDetails.belongsTo(devolutions, { foreignKey: 'idDevolution' });

// devolutionMotives.hasOne(devolutionDetails, { foreignKey: 'idMotive' });
// devolutionDetails.belongsTo(devolutionMotives, { foreignKey: 'idMotive' });

// async function syncDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Se conecto bien exoticamente');

//     // Sincroniza todos los modelos
//     await sequelize.sync({ force: true }); // O usa { alter: true } para actualizar las tablas sin borrarlas
//     console.log('Los modelos se crearon melos');
//   } catch (error) {
//     console.error('No se pudo crear los modelos, paila, mire aver si entiende: ', error);
//   } finally {
//     await sequelize.close();
//   }
// }

// syncDatabase();


const sequelize = require('./src/config/database');
const {
  Permissions,
  Roles,
  Users,
  Employees,
  Clients,
  ProductionOrders,
  ProductionOrderDetails,
  Products,
  ProductCategories,
  Requests,
  RequestDetails,
  Datasheets,
  DatasheetDetails,
  Masses,
  MassDetails,
  Supplies,
  Boughts,
  BoughtDetails,
  Providers,
  Sales,
  SaleDetails,
  Devolutions,
  DevolutionDetails,
  DevolutionMotives,
  RolePermissions
} = require('./src/models'); // Asegúrate de ajustar la ruta según tu estructura de directorios

// Definición de las relaciones
Roles.belongsToMany(Permissions, { through: RolePermissions, foreignKey: 'idRole' });
Permissions.belongsToMany(Roles, { through: RolePermissions, foreignKey: 'idPermission' });

Roles.hasMany(Users, { foreignKey: 'idRol' });
Users.belongsTo(Roles, { foreignKey: 'idRol' });

Users.hasOne(Employees, { foreignKey: 'idUser' });
Employees.belongsTo(Users, { foreignKey: 'idUser' });

Users.hasOne(Clients, { foreignKey: 'idUser' });
Clients.belongsTo(Users, { foreignKey: 'idUser' });

Employees.hasMany(ProductionOrders, { foreignKey: 'idEmployee' });
ProductionOrders.belongsTo(Employees, { foreignKey: 'idEmployee' });

ProductionOrders.hasMany(ProductionOrderDetails, { foreignKey: 'idProductionOrder' });
ProductionOrderDetails.belongsTo(ProductionOrders, { foreignKey: 'idProductionOrder' });

Products.hasOne(ProductionOrderDetails, { foreignKey: 'idProduct' });
ProductionOrderDetails.belongsTo(Products, { foreignKey: 'idProduct' });

Clients.hasMany(Requests, { foreignKey: 'idClient' });
Requests.belongsTo(Clients, { foreignKey: 'idClient' });

Requests.hasMany(RequestDetails, { foreignKey: 'idRequest' });
RequestDetails.belongsTo(Requests, { foreignKey: 'idRequest' });

ProductCategories.hasOne(Products, { foreignKey: 'idCategorie' });
Products.belongsTo(ProductCategories, { foreignKey: 'idCategorie' });

Products.hasOne(RequestDetails, { foreignKey: 'idProduct' });
RequestDetails.belongsTo(Products, { foreignKey: 'idProduct' });

Datasheets.hasMany(Products, { foreignKey: 'idDatasheet' });
Products.belongsTo(Datasheets, { foreignKey: 'idDatasheet' });

Datasheets.hasMany(DatasheetDetails, { foreignKey: 'idDatasheet' });
DatasheetDetails.belongsTo(Datasheets, { foreignKey: 'idDatasheet' });

Masses.hasOne(Datasheets, { foreignKey: 'idMass' });
Datasheets.belongsTo(Masses, { foreignKey: 'idMass' });

Masses.hasMany(MassDetails, { foreignKey: 'idMass' });
MassDetails.belongsTo(Masses, { foreignKey: 'idMass' });

Supplies.hasOne(DatasheetDetails, { foreignKey: 'idSupplie' });
DatasheetDetails.belongsTo(Supplies, { foreignKey: 'idSupplie' });

Supplies.hasOne(MassDetails, { foreignKey: 'idSupplie' });
MassDetails.belongsTo(Supplies, { foreignKey: 'idSupplie' });

Boughts.hasMany(BoughtDetails, { foreignKey: 'idBought' });
BoughtDetails.belongsTo(Boughts, { foreignKey: 'idBought' });

Providers.hasOne(Boughts, { foreignKey: 'idProvider' });
Boughts.belongsTo(Providers, { foreignKey: 'idProvider' });

Sales.hasMany(SaleDetails, { foreignKey: 'idSale' });
SaleDetails.belongsTo(Sales, { foreignKey: 'idSale' });

Products.hasOne(SaleDetails, { foreignKey: 'idProduct' });
SaleDetails.belongsTo(Products, { foreignKey: 'idProduct' });

Clients.hasMany(Sales, { foreignKey: 'idClient' });
Sales.belongsTo(Clients, { foreignKey: 'idClient' });

Sales.hasOne(Devolutions, { foreignKey: 'idSale' });
Devolutions.belongsTo(Sales, { foreignKey: 'idSale' });

Devolutions.hasMany(DevolutionDetails, { foreignKey: 'idDevolution' });
DevolutionDetails.belongsTo(Devolutions, { foreignKey: 'idDevolution' });

DevolutionMotives.hasOne(DevolutionDetails, { foreignKey: 'idMotive' });
DevolutionDetails.belongsTo(DevolutionMotives, { foreignKey: 'idMotive' });

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Se conecto bien exoticamente');

    // Sincroniza todos los modelos
    await sequelize.sync({ force: true }); // O usa { alter: true } para actualizar las tablas sin borrarlas
    console.log('Los modelos se crearon melos');
  } catch (error) {
    console.error('No se pudo crear los modelos, paila, mire aver si entiende: ', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
