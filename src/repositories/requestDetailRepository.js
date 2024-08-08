
const { models } = require('../models');

const getAllRequestDetail = async () => {
    return await models.RequestDetail.findAll();
};

const getRequestDetailById = async (id) => {
    return await models.RequestDetail.findByPk(id);
};

const createRequestDetail = async (data) => {
    return await models.RequestDetail.create(data);
};

const updateRequestDetail = async (id, data) => {
    return await models.RequestDetail.update(data, {
        where: {
            requestDetailId: id
        }
    });
};

const deleteRequestDetail = async (id) => {
    return await models.RequestDetail.destroy({
        where: {
            requestDetailId: id
        }
    });
};

module.exports = {
    getAllRequestDetail,
    getRequestDetailById,
    createRequestDetail,
    updateRequestDetail,
    deleteRequestDetail
};
