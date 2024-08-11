const { models } = require('../models');

const getAllBoughts = async () => {
    return await models.Bought.findAll({
        include: [models.BoughtDetail],
    });
};

const getBoughtById = async (id) => {
    return await models.Bought.findByPk(id, {
        include: [models.BoughtDetail]
    });
};

const createBought = async (data) => {
    return await models.Bought.create(data);
};

const updateBought = async (id, data) => {
    return await models.Bought.update(data, {
        where: { id }
    });
};

const deleteBought = async (id) => {
    return await models.Bought.destroy({
        where: { id }
    });
};

module.exports = {
    getAllBoughts,
    getBoughtById,
    createBought,
    updateBought,
    deleteBought
};