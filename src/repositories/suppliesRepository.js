const { models } = require('../models');

const getAllSupplies = async () => {
    return await models.Supplies.findAll();
};

const getSuppliesById = async (id) => {
    return await models.Supplies.findByPk(id);
};

const createSupplies = async (data) => {
    return await models.Supplies.create(data);
};

const updateSupplies = async (id, data) => {
    return await models.Supplies.update(data, {
        where: { id }
    });
};

const deleteSupplies = async (id) => {
    return await models.Supplies.destroy({
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

