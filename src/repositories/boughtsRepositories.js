const sequelize = require('../config/database');
const { models } = require('../models');

const getAllBoughts = async () => {
    return await models.Bought.findAll({
        include: [models.BoughtDetail],
    });
};

const getBoughtById = async (id) => {
    return await models.Bought.findByPk(id, {
        include: [models.BoughtDetail]
    });
};

const createBought = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { nroReceipt, date, total, state, idProvider, details } = data;

        // Crea la compra
        const bought = await models.Bought.create({
            nroReceipt,
            date,
            total,
            state,
            idProvider
        }, { transaction });

        // Crea los detalles de la compra
        const boughtDetails = details.map(detail => ({
            ...detail,
            idBought: bought.id
        }));
        await models.BoughtDetail.bulkCreate(boughtDetails, { transaction });

        // Confirma la transacción
        await transaction.commit();

        return { success: true, bought };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al crear compra y detalles:', error);
        return { success: false, error };
    }
};

const updateBought = async (id, data) => {
    return await models.Bought.update(data, {
        where: { id }
    });
};

const deleteBought = async (id) => {
    return await models.Bought.destroy({
        where: { id }
    });
};

module.exports = {
    getAllBoughts,
    getBoughtById,
    createBought,
    updateBought,
    deleteBought
};