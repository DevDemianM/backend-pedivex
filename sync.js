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
