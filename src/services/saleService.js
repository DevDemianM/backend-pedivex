const saleRepository = require('../repositories/saleRepository');

const getAllSales = async () => {
    return await saleRepository.getAllSales();
};

const getSaleById = async (id) => {
    return await saleRepository.getSaleById(id);
};

const createSale = async (data) => {
    return await saleRepository.createSale(data);
};

const updateSale = async (id, data) => {
    return await saleRepository.updateSale(id, data);
};

const deleteSale = async (id) => {
    return await saleRepository.deleteSale(id);
};

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};