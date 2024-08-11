const boughtDetailService = require('../services/boughtDetailsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllBoughtDetails = async (req, res) => {
    try {
        const boughtDetails = await boughtDetailService.getAllBoughtDetails();
        sendResponse(res, boughtDetails);
    } catch (error) {
        sendError(res, error);
    }
};

const getBoughtDetailById = async (req, res) => {
    try {
        const boughtDetail = await boughtDetailService.getBoughtDetailById(req.params.id);
        if (!bought) {
            return sendError(res, 'boughtDetail not found', 404);
        }
        sendResponse(res, boughtDetail);
    } catch (error) {
        sendError(res, error);
    }
};

const createBoughtDetail = async (req, res) => {
    try {
        const boughtDetail = await boughtDetailService.createBoughtDetail(req.body);
        sendResponse(res, boughtDetail, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateBoughtDetail = async (req, res) => {
    try {
        const updated = await boughtDetailService.updateBoughtDetail(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'boughtDetail not found', 404);
        }
        sendResponse(res, 'boughtDetail updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteBoughtDetail = async (req, res) => {
    try {
        const deleted = await boughtDetailService.deleteBoughtDetail(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'boughtDetail not found', 404);
        }
        sendResponse(res, 'boughtDetail deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllBoughtDetails,
    getBoughtDetailById,
    createBoughtDetail,
    updateBoughtDetail,
    deleteBoughtDetail
};

