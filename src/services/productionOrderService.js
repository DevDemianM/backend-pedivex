
const productionOrderRepository = require('../repositories/productionOrderRepository');

const getAllProductionOrder = async () => {
    return await productionOrderRepository.getAllProductionOrder();
};

const getProductionOrderById = async (id) => {
    return await productionOrderRepository.getProductionOrderById(id);
};

const createProductionOrder = async (data) => {
    return await productionOrderRepository.createProductionOrder(data);
};

const updateProductionOrder = async (id, data) => {
    return await productionOrderRepository.updateProductionOrder(id, data);
};

const deleteProductionOrder = async (id) => {
    return await productionOrderRepository.deleteProductionOrder(id);
};

module.exports = {
    getAllProductionOrder,
    getProductionOrderById,
    createProductionOrder,
    updateProductionOrder,
    deleteProductionOrder
};

