const { models } = require('../models');
const sequelize = require('../config/database');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
    include: [
      {
        model: models.DevolutionDetails, // Modelo para los detalles de devolución
        as: 'details', // Alias para la asociación
        include: [
          {
            model: models.Product, // Incluir productos asociados
            as: 'product', // Alias para la asociación
          },
          {
            model: models.MotiveDevolution, // Incluir motivos de devolución asociados
            as: 'motiveDevolution', // Alias para la asociación
          },
        ],
      },
    ],
  });
};


const getDevolutionById = async (id) => {
  return await models.Devolution.findByPk(id, {
    include: [
      {
        model: models.DevolutionDetails, // Modelo para los detalles de devolución
        as: 'details', // Alias usado en el primer código
        include: [
          {
            model: models.Product, // Incluir productos asociados
            as: 'product', // Alias para productos
            attributes: ['name']
          },
          {
            model: models.MotiveDevolution, // Incluir motivos de devolución asociados
            as: 'motiveDevolution', // Alias para motivos de devolución
          },
        ],
      },
      {
        model: models.Sale, // Incluir ventas asociadas
        as: 'sale', // Alias para la venta (si lo necesitas)
        include: [
          {
            model: models.SaleDetail, // Incluir detalles de la venta
            as: 'saleDetails', // Alias para detalles de la venta (ajústalo según lo que uses en tu modelo)
            include: [
              {
                model: models.Product, // Incluir productos dentro de los detalles de la venta
                as: 'product', // Alias para productos
                attributes: ['name'],
              },
            ],
          },
        ],
      },
    ],
  });
};


const createDevolution = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { idSale, devolutionDetails } = data;
    const date = new Date();
    const state = 1;

    // Crear la devolución
    const devolution = await models.Devolution.create(
      { idSale, date, state },
      { transaction }
    );

    // Preparar detalles de devolución
    const details = devolutionDetails.map(detail => ({
      ...detail,
      idDevolution: devolution.id
    }));

    // Crear detalles de devolución
    await models.DevolutionDetails.bulkCreate(details, { transaction });

    // Procesar cada detalle de la devolución
    for (const detail of devolutionDetails) {
      const { idProduct, quantity, changedProduct, changedQuantity, idMotive } = detail;

      // Caso de cambio de sabor (Motivo 1)
      if (idMotive === 1) {
        // Actualizar stock del producto devuelto
        await models.Product.update(
          { stock: sequelize.literal(`stock + ${quantity}`) },
          { where: { id: idProduct }, transaction }
        );

        // Actualizar stock del producto cambiado
        await models.Product.update(
          { stock: sequelize.literal(`stock - ${changedQuantity}`) },
          { where: { id: changedProduct }, transaction }
        );
      }

      // Caso de devolución por cambio de sabor (Motivo 2) - Sin afectar stock
      if (idMotive === 2) {
        // Solo registrar la devolución, no afecta el stock
        // No se realiza ninguna actualización de stock en este caso.
      }

      // Caso de devolución por producto en mal estado (Motivo 3)
      if (idMotive === 3) {
        // Verificar si la fecha de vencimiento es válida
        const product = await models.Product.findOne({
          where: { id: idProduct },
          transaction
        });
      
        const expirationDate = new Date(product.expirationDate);
        const currentDate = new Date();
      
        // Verificar si la fecha de vencimiento es vigente
        if (expirationDate > currentDate) {
          // Solo disminuir el stock del producto cambiado
          await models.Product.update(
            { stock: sequelize.literal(`stock - ${changedQuantity}`) },
            { where: { id: changedProduct }, transaction }
          );
        } else {
          // Si la fecha no es vigente, no hacer nada con el stock
          // Solo se registra la devolución sin afectar el stock
        }
      }
      

      // Caso de devolución por producto vencido (Motivo 4)
      if (idMotive === 4) {
        // Verificar si la fecha de vencimiento está dentro de las últimas 24 horas
        const product = await models.Product.findOne({
          where: { id: idProduct },
          transaction
        });

        const expirationDate = new Date(product.expirationDate);
        const currentDate = new Date();

        // Calcular la diferencia en horas entre la fecha de vencimiento y la fecha actual
        const diffInHours = (currentDate - expirationDate) / (1000 * 60 * 60);

        // Verificar si el producto tiene 24 horas o menos de vencido
        if (diffInHours <= 24) {
          // Realizar la devolución y disminuir el stock del producto cambiado
          await models.Product.update(
            { stock: sequelize.literal(`stock - ${changedQuantity}`) },
            { where: { id: changedProduct }, transaction }
          );
        }
      }

      // Caso de devolución por paquete roto (Motivo 5) - Sin afectar stock
      if (idMotive === 5) {
        // Solo registrar la devolución, no afecta el stock
        // No se realiza ninguna actualización de stock en este caso.
      }
    }

    // Finalizar la transacción
    await transaction.commit();

    return { success: true, devolution };
  } catch (error) {
    await transaction.rollback();
    return { success: false, error };
  }
};



module.exports = {
  getAllDevolutions,
  getDevolutionById,
  createDevolution
};
