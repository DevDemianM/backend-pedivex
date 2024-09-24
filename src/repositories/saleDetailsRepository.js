const {models} = require('../models');

const getAllSaleDetails= async()=> {
    return await models.SaleDetail.findAll();
};

const getSaleDetailsById = async (id) => {
    return await models.SaleDetail.findByPk(id);
};

module.exports = {
    getAllSaleDetails,
    getSaleDetailsById
};