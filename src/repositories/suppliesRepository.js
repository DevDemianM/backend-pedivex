const { models } = require('../models');

const getAllSupplies = async () => {
    return await models.Supply.findAll();
};

const getSuppliesById = async (id) => {
    return await models.Supply.findByPk(id);
};

const createSupplies = async (data) => {
    return await models.Supply.create(data);
};

const updateSupplies = async (id, data) => {
    return await models.Supply.update(data, {
        where: { id }
    });
};

const deleteSupplies = async (id) => {
    return await models.Supply.destroy({
        where: { id }
    });
};

module.exports = {
    getAllSupplies,
    getSuppliesById,
    createSupplies,
    updateSupplies,
    deleteSupplies
};

