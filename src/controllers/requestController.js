
const requestService = require('../services/requestService');
const { sendResponse, sendError } = require('../utils/response');

const getAllRequest = async (req, res) => {
    try {
        const requests = await requestService.getAllRequest();
        sendResponse(res, requests);
    } catch (error) {
        sendError(res, error);
    }
};

const getRequestById = async (req, res) => {
    try {
        const request = await requestService.getRequestById(req.params.id);
        if (!request) {
            return sendError(res, 'Request not found', 404);
        }
        sendResponse(res, request);
    } catch (error) {
        sendError(res, error); 
    }
};

const createRequest = async (req, res) => {
    try {
        const request = await requestService.createRequest(req.body);
        sendResponse(res, request, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateRequest = async (req, res) => {
    try {
        const updated = await requestService.updateRequest(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'Request not found', 404);
        }
        sendResponse(res, 'Request updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteRequest = async (req, res) => {
    try {
        const deleted = await requestService.deleteRequest(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Request not found', 404);
        }
        sendResponse(res, 'Request deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllRequest,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};

