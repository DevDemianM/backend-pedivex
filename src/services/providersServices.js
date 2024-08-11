const providersRepository = require('../repositories/providersRepositories');

const getAllProviders = async () => {
    return await providersRepository.getAllProviders();
};

const getProviderById = async (id) => {
    return await providersRepository.getProviderById(id);
};

const createProvider = async (data) => {
    return await providersRepository.createProvider(data);
};

const updateProvider = async (id, data) => {
    return await providersRepository.updateProvider(id, data);
};

const deleteProvider = async (id) => {
    return await providersRepository.deleteProvider(id);
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};