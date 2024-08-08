
const requestDetailService = require('../services/requestDetailService');
const { sendResponse, sendError } = require('../utils/response');

const getAllRequestDetail = async (req, res) => {
    try {
        const requestDetails = await requestDetailService.getAllRequestDetail();
        sendResponse(res, requestDetails);
    } catch (error) {
        sendError(res, error);
    }
};

const getRequestDetailById = async (req, res) => {
    try {
        const requestDetail = await requestDetailService.getRequestDetailById(req.params.id);
        if (!requestDetail) {
            return sendError(res, 'Request Detail not found', 404);
        }
        sendResponse(res, requestDetail);
    } catch (error) {
        sendError(res, error); 
    }
};

const createRequestDetail = async (req, res) => {
    try {
        const requestDetail = await requestDetailService.createRequestDetail(req.body);
        sendResponse(res, requestDetail, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateRequestDetail = async (req, res) => {
    try {
        const updated = await requestDetailService.updateRequestDetail(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Request Detail not found', 404);
        }
        sendResponse(res, 'Request Detail updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteRequestDetail = async (req, res) => {
    try {
        const deleted = await requestDetailService.deleteRequestDetail(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Request Detail not found', 404);
        }
        sendResponse(res, 'Request Detail deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllRequestDetail,
    getRequestDetailById,
    createRequestDetail,
    updateRequestDetail,
    deleteRequestDetail
};

