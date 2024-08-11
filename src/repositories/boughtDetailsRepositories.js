const { models } = require('../models');

const getAllBoughtDetails = async () => {
    return await models.BoughtDetail.findAll();
};

const getBoughtDetailById = async (id) => {
    return await models.BoughtDetail.findByPk(id);
};

const createBoughtDetail = async (data) => {
    return await models.BoughtDetail.create(data);
};

const updateBoughtDetail = async (id, data) => {
    return await models.BoughtDetail.update(data, {
        where: { id }
    });
};

const deleteBoughtDetail = async (id) => {
    return await models.BoughtDetail.destroy({
        where: { id }
    });
};

module.exports = {
    getAllBoughtDetails,
    getBoughtDetailById,
    createBoughtDetail,
    updateBoughtDetail,
    deleteBoughtDetail
};