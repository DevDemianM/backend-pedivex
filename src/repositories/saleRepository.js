const sequelize = require('../config/database');
const { models } = require('../models');

const getAllSales = async () => {
    return await models.Sale.findAll({
        include: [
            {
                model: models.SaleDetail
            },
            {
                model: models.User
            }
        ],
    });
};

const getSaleById = async (id) => {
    return await models.Sale.findByPk(id, {
        include: [
            {
                model: models.SaleDetail
            },
            {
                model: models.User
            }
        ],
    });
};

const createSale = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { deliveryDate, total, state, idUser, details } = data;

        // Crea la compra
        const sale = await models.Sale.create({
            deliveryDate,
            total,
            state,
            idUser
        }, { transaction });

        // Crea los detalles de la compra
        const saleDetails = details.map(detail => ({
            ...detail,
            idSale: sale.id
        }));
        await models.SaleDetail.bulkCreate(saleDetails, { transaction });

        // Confirma la transacción
        await transaction.commit();

        return { success: true, bought };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al crear venta y detalles:', error);
        return { success: false, error };
    }
};

const updateSale = async (id, data) => {
    return await models.Sale.update(data, {
        where: { id }
    });
};

const deleteSale = async (id) => {
    return await models.Sale.destroy({
        where: { id }
    });
};

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}