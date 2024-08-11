const { models } = require('../models');

const getAllProviders = async () => {
    return await models.Provider.findAll();
};

const getProviderById = async (id) => {
    return await models.Provider.findByPk(id);
};

const createProvider = async (data) => {
    return await models.Provider.create(data);
};

const updateProvider = async (id, data) => {
    return await models.Provider.update(data, {
        where: { id }
    });
};

const deleteProvider = async (id) => {
    return await models.Provider.destroy({
        where: { id }
    });
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};