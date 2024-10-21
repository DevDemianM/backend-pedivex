const sequelize = require('./src/config/database');

const { syncDatabase } = require('./src/models');

async function sync() {
  try {
    await sequelize.authenticate();

    console.log('Se conectó a la base de datos');

    await syncDatabase();

    console.log('Se sincronizaron los modelos');

  } catch (error) {

    console.error('No se pudieron crear los modelos: ', error);

  } finally {

    await sequelize.close();

  }
}

sync(); 