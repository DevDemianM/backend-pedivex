const SuppliesRepository = require('../repositories/suppliesRepository');

const getAllSupplies = async () => {
    return await SuppliesRepository.getAllSupplies();
};

const getSuppliesById = async (id) => {
    return await SuppliesRepository.getSuppliesById(id);
};

const createSupplies = async (data) => {
    return await SuppliesRepository.createSupplies(data);
};

const updateSupplies = async (id, data) => {
    return await SuppliesRepository.updateSupplies(id, data);
};

const updateSuppliesStock = async (id, stock) => {
    return await SuppliesRepository.updateSuppliesStock(id, stock);
};

const deleteSupplies = async (id) => {
    return await SuppliesRepository.deleteSupplies(id);
};

module.exports = {
    getAllSupplies,
    getSuppliesById,
    createSupplies,
    updateSupplies,
    deleteSupplies,
    updateSuppliesStock
};

