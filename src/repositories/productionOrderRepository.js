
const { models } = require('../models');
const productionOrderDetails = require('../models/productionOrderDetails');

const getAllProductionOrder = async () => {
    return await models.ProductionOrder.findAll({
        include: [models.ProductionOrderDetail]
    });
};

const getProductionOrderById = async (id) => {
    return await models.ProductionOrder.findByPk(id, {
        include: [models.ProductionOrderDetail]
    });
};

/*
const createProductionOrder = async (data) => {
    return await models.ProductionOrder.create(data);
};
*/
const createProductionOrder = async (data) => {
    const orders = await orders.create(data, {
      include: [
        {
          model: productionOrderDetails,
          include: [
            {
              model: productionOrderDetails
            },
          ]
        }
      ]
    });
    return orders;
  }

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

