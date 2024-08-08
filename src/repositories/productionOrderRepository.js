
const { models } = require('../models');

const getAllProductionOrder = async () => {
    return await models.ProductionOrder.findAll({
        include: [models.OrderDetail]
    });
};

const getProductionOrderById = async (id) => {
    return await models.ProductionOrder.findByPk(id, {
        include: [models.OrderDetail]
    });
};

const createProductionOrder = async (data) => {
    return await models.ProductionOrder.create(data);
};

const updateProductionOrder = async (id, data) => {
    return await models.ProductionOrder.update(data, {
        where: {
            orderId: id
        }
    });
};

const deleteProductionOrder = async (id) => {
    return await models.ProductionOrder.destroy({
        where: {
            orderId: id
        }
    });
};

module.exports = {
    getAllProductionOrder,
    getProductionOrderById,
    createProductionOrder,
    updateProductionOrder,
    deleteProductionOrder
};

