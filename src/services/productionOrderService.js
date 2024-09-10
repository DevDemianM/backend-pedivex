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
    try {
      const { state, details } = data;
      const result = await productionOrderRepository.updateProductionOrder(id, state, details);
      return result;
    } catch (error) {
      console.error('Error in service:', error);
      throw error;
    }
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
