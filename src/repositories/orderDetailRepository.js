
const { models } = require('../models');

const getAllOrderDetail = async () => {
    return await models.ProductionOrder.findAll();
};

const getOrderDetailById = async (id) => {
    return await models.ProductionOrder.findByPk(id);
};

const createOrderDetail = async (data) => {
    return await models.ProductionOrder.create(data);
};

const updateOrderDetail = async (id, data) => {
    return await models.ProductionOrder.update(data, {
        where: {
            orderDetailId: id
        }
    });
};

const deleteOrderDetail = async (id) => {
    return await models.ProductionOrder.destroy({
        where: {
            orderDetailId: id
        }
    });
};

module.exports = {
    getAllOrderDetail,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};
