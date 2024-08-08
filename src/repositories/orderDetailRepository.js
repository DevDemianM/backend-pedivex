
const { models } = require('../models');

const getAllOrderDetail = async () => {
    return await models.OrderDetail.findAll();
};

const getOrderDetailById = async (id) => {
    return await models.OrderDetail.findByPk(id);
};

const createOrderDetail = async (data) => {
    return await models.OrderDetail.create(data);
};

const updateOrderDetail = async (id, data) => {
    return await models.OrderDetail.update(data, {
        where: {
            orderDetailId: id
        }
    });
};

const deleteOrderDetail = async (id) => {
    return await models.OrderDetail.destroy({
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
