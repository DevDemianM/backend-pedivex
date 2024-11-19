const suppliesService = require('../services/suppliesService');
const { sendResponse, sendError } = require('../utils/response');

const getAllSupplies = async (req, res) => {
    try {
        const supplies = await suppliesService.getAllSupplies();
        sendResponse(res, supplies);
    } catch (error) {
        sendError(res, error);
    }
};

const getSuppliesById = async (req, res) => {
    try {
        const supplies = await suppliesService.getSuppliesById(req.params.id);
        if (!supplies) {
            return sendError(res, 'Supplies not found', 404);
        }
        sendResponse(res, supplies);
    } catch (error) {
        sendError(res, error);
    }
};

const createSupplies = async (req, res) => {
    try {
        const supplies = await suppliesService.createSupplies(req.body);
        sendResponse(res, supplies, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateSupplies = async (req, res) => {
    try {
        const updated = await suppliesService.updateSupplies(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Supplies not found', 404);
        }
        sendResponse(res, 'Supplies updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const updateSuppliesStock = async (req, res) => {
    try {
        const updated = await suppliesService.updateSuppliesStock(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Supplies not found', 404);
        }
        sendResponse(res, 'Supplies updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteSupplies = async (req, res) => {
    try {
        const deleted = await suppliesService.deleteSupplies(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Supplies not found', 404);
        }
        sendResponse(res, 'Supplies deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllSupplies,
    getSuppliesById,
    createSupplies,
    updateSupplies,
    deleteSupplies,
    updateSuppliesStock
};
