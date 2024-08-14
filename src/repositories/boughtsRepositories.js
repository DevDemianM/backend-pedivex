const sequelize = require('../config/database');
const { models } = require('../models');

const getAllBoughts = async () => {
    return await models.Bought.findAll({
        include: [
            {
                model: models.BoughtDetail
            },
            {
                model: models.Provider
            }
        ],
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
        const { nroReceipt, date, total, state, details, providerName } = data;

        // Verificar si el proveedor ya existe
        let provider = await models.Provider.findOne({
            where: { provider: providerName },
            transaction
        });

        // Crear el proveedor si no existe
        if (!provider) {
            provider = await models.Provider.create({
                provider: providerName
            }, { transaction });
        }

        // Usa el ID del proveedor existente o recién creado
        const idProvider = provider.id;

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