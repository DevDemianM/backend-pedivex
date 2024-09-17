const sequelize = require('./src/config/database');
const { syncContraints } = require('./src/models');


async function syncDatabase() {
  try {
    await sequelize.authenticate();

    console.log('Se conectó a la base de datos');

    // Sincroniza todos los constraitns
    await syncContraints();

    console.log('Se sincronizaron los modelos');

  } catch (error) {

    console.error('No se pudieron crear los modelos: ', error);

  } finally {

    await sequelize.close();
  
  }
}

syncDatabase(); 
