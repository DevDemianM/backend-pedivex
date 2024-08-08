const sequelize = require('./src/config/database');
const {
    supplies,
    masses,
    massDetails,
    datasheets,
    datasheetDetails,
    productCategories,
    products,
    devolutions,
    
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