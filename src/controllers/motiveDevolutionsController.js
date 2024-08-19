const MotiveDevolutionsService = require('../services/motiveDevolutionsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllMotiveDevolutions = async (req, res) => {
    try {
        const MotiveDevolutions = await MotiveDevolutionsService.getAllMotiveDevolutions();
        sendResponse(res, MotiveDevolutions);
    } catch (error) {
        sendError(res, error);
    }
};

const createMotiveDevolutions = async (req, res) => {
    try {
        const MotiveDevolutions = await MotiveDevolutionsService.createMotiveDevolutions(req.body);
        sendResponse(res, MotiveDevolutions, 201);
    } catch (error) {
        sendError(res, error);
    }
};


module.exports = {
    getAllMotiveDevolutions,
    createMotiveDevolutions
};
