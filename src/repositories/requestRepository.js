const sequelize = require('../config/database');
const { models } = require('../models');

const getAllRequests = async () => {
    return await models.Request.findAll({
        include: [models.RequestDetail],
    });
};

const getRequestById = async (id) => {
    return await models.Request.findByPk(id, {
        include: [models.RequestDetail]
    });
};

const createRequest = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { creationDate, idUser, total, state, deadLine, stateDate, details } = data;

        // Crea la solicitud
        const request = await models.Request.create({
            creationDate,
            idUser,
            total,
            state,
            deadLine,
            stateDate
        }, { transaction });

        // Crea los detalles de la solicitud
        const requestDetails = details.map(detail => ({
            ...detail,
            idRequest: request.id
        }));
        await models.RequestDetail.bulkCreate(requestDetails, { transaction });

        // Confirma la transacción
        await transaction.commit();

        return { success: true, request };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al crear la solicitud y detalles:', error);
        return { success: false, error };
    }
};

const updateRequest = async (id, data) => {
    return await models.Request.update(data, {
        where: { id }
    });
};

const deleteRequest = async (id) => {
    return await models.Request.destroy({
        where: { id }
    });
};

module.exports = {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};
