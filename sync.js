const sequelize = require('./src/config/database');

const {
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
  DevolutionMotive,
  States,
  syncDatabase
} = require('./src/models');

async function sync() {
  try {
    await sequelize.authenticate();

    console.log('Se conectó a la base de datos');

    syncDatabase();
    
    console.log('Se sincronizaron los modelos');

  } catch (error) {

    console.error('No se pudieron crear los modelos: ', error);

  } finally {

    await sequelize.close();

  }
}

sync(); 