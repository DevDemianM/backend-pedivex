
const orderDetailRepository = require('../repositories/orderDetailRepository');

const getAllOrderDetail = async () => {
    return await orderDetailRepository.getAllOrderDetail();
};

const getOrderDetailById = async (id) => {
    return await orderDetailRepository.getOrderDetailById(id);
};

const createOrderDetail = async (data) => {
    return await orderDetailRepository.createOrderDetail(data);
};

const updateOrderDetail = async (id, data) => {
    return await orderDetailRepository.updateOrderDetail(id, data);
};

const deleteOrderDetail = async (id) => {
    return await orderDetailRepository.deleteOrderDetail(id);
};

module.exports = {  
    getAllOrderDetail,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};

