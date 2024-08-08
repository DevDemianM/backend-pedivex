
const { models } = require('../models');

const getAllRequest = async () => {
    return await models.Request.findAll({
        include: [models.RequestDetail]
    });
};

const getRequestById = async (id) => {
    return await models.Request.findByPk(id, {
        include: [models.RequestDetail]
    });
};

const createRequest = async (data) => {
    return await models.Request.create(data);
};

const updateRequest = async (id, data) => {
    return await models.Request.update(data, {
        where: {
            requestId: id
        }
    });
};

const deleteRequest = async (id) => {
    return await models.Request.destroy({
        where: {
            requestId: id
        }
    });
};

module.exports = {
    getAllRequest,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};
