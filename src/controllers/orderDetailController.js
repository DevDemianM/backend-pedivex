
const orderDetailService = require('../services/orderDetailService');
const { sendResponse, sendError } = require('../utils/response');

const getAllOrderDetail = async (req, res) => {
    try {
        const orderDetails = await orderDetailService.getAllOrderDetail();
        sendResponse(res, orderDetails);
    } catch (error) {
        sendError(res, error);
    }
};

const getOrderDetailById = async (req, res) => {
    try {
        const orderDetail = await orderDetailService.getOrderDetailById(req.params.id);
        if (!orderDetail) {
            return sendError(res, 'Order Detail not found', 404);
        }
        sendResponse(res, orderDetail);
    } catch (error) {
        sendError(res, error); 
    }
};

const createOrderDetail = async (req, res) => {
    try {
        const orderDetail = await orderDetailService.createOrderDetail(req.body);
        sendResponse(res, orderDetail, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        const updated = await orderDetailService.updateOrderDetail(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Order Detail not found', 404);
        }
        sendResponse(res, 'Order Detail updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteOrderDetail = async (req, res) => {
    try {
        const deleted = await orderDetailService.deleteOrderDetail(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Order Detail not found', 404);
        }
        sendResponse(res, 'Order Detail deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllOrderDetail,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};

