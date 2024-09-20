const saleDetailsRepository = require('../repositories/saleDetailsRepository');

const getAllSaleDetails = async () => {
    return await saleDetailsRepository.getAllSaleDetails();
}

const getSaleDetailById = async (id) => {
    return await saleDetailsRepository.getSaleDetailById(id);
};

module.exports = {
    getAllSaleDetails,
    getSaleDetailById
};