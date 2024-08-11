const boughtService = require('../services/boughtsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllBoughts = async (req, res) => {
    try {
        const boughts = await boughtService.getAllBoughts();
        sendResponse(res, boughts);
    } catch (error) {
        sendError(res, error);
    }
};

const getBoughtById = async (req, res) => {
    try {
        const bought = await boughtService.getBoughtById(req.params.id);
        if (!bought) {
            return sendError(res, 'bought not found', 404);
        }
        sendResponse(res, bought);
    } catch (error) {
        sendError(res, error);
    }
};

const createBought = async (req, res) => {
    try {
        const bought = await boughtService.createBought(req.body);
        sendResponse(res, bought, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateBought = async (req, res) => {
    try {
        const updated = await boughtService.updateBought(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'bought not found', 404);
        }
        sendResponse(res, 'bought updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteBought = async (req, res) => {
    try {
        const deleted = await boughtService.deleteBought(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'bought not found', 404);
        }
        sendResponse(res, 'bought deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllBoughts,
    getBoughtById,
    createBought,
    updateBought,
    deleteBought
};

