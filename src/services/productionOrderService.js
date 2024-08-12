
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

const createOrderDetails = async (orderId, orderDetails) => {
    for (const detail of orderDetails) {
        await orderDetailRepository.createOrderDetail({ ...detail, orderId });
    }
};

const updateProductionOrder = async (id, data) => {
    return await productionOrderRepository.updateProductionOrder(id, data);
};

const updateOrderDetails = async (orderId, orderDetails) => {
    await orderDetailRepository.deleteOrderDetailsByOrderId(orderId); // Esto aqui es pa borrar detalles anteriores
    await createOrderDetails(orderId, orderDetails); // Esto aqui es pa crear nuevos detalles
};

const deleteProductionOrder = async (id) => {
    return await productionOrderRepository.deleteProductionOrder(id);
};

const deleteOrderDetails = async (orderId) => {
    return await orderDetailRepository.deleteOrderDetailsByOrderId(orderId);
};

module.exports = {
    getAllProductionOrder,
    getProductionOrderById,
    createProductionOrder,
    updateProductionOrder,
    deleteProductionOrder,
    updateOrderDetails,
    deleteOrderDetails
};
