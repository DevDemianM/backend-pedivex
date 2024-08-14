const saleService = require('../services/saleService');
const { sendResponse, sendError } = require('../utils/response');

const getAllSales = async (req, res) => {
    try {
        const sale = await saleService.getAllSales();
        sendResponse(res, sale);
    } catch (error) {
        sendError(res, error);
    }
};

const getSaleById = async (req, res) => {
    try {
        const sale = await saleService.getSaleById(req.params.id);
        if (!sale) {
            return sendError(res, 'sale not found', 404);
        }
        sendResponse(res, sale);
    } catch (error) {
        sendError(res, error);
    }
};

const createSale = async (req, res) => {
    try {
        const sale = await saleService.createSale(req.body);
        sendResponse(res, sale, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateSale = async (req, res) => {
    try {
        const updated = await saleService.updateSale(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'sale not found', 404);
        }
        sendResponse(res, 'sale updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteSale = async (req, res) => {
    try {
        const deleted = await saleService.deleteSale(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'sale not found', 404);
        }
        sendResponse(res, 'sale deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};


module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};