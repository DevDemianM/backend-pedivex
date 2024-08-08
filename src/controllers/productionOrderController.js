
const productionOrderService = require('../services/productionOrderService');
const { sendResponse, sendError } = require('../utils/response');

const getAllProductionOrder = async (req, res) => {
    try {
        const productionOrders = await productionOrderService.getAllProductionOrder();
        sendResponse(res, productionOrders);
    } catch (error) {
        sendError(res, error);
    }
};

const getProductionOrderById = async (req, res) => {
    try {
        const productionOrder = await productionOrderService.getProductionOrderById(req.params.id);
        if (!productionOrder) {
            return sendError(res, 'Production Order not found', 404);
        }
        sendResponse(res, productionOrder);
    } catch (error) {
        sendError(res, error);
    }
};

const createProductionOrder = async (req, res) => {
    try {
        const productionOrder = await productionOrderService.createProductionOrder(req.body);
        sendResponse(res, productionOrder, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateProductionOrder = async (req, res) => {
    try {
        const updated = await productionOrderService.updateProductionOrder(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Production Order not found', 404);
        }
        sendResponse(res, 'Production Order updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteProductionOrder = async (req, res) => {
    try {
        const deleted = await productionOrderService.deleteProductionOrder(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Production Order not found', 404);
        }
        sendResponse(res, 'Production Order deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllProductionOrder,
    getProductionOrderById,
    createProductionOrder,
    updateProductionOrder,
    deleteProductionOrder
};

