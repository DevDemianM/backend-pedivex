const { sendResponse, sendError } = require('../utils/response');
const devolutionService = require('../services/devolutionServices');

const getAllDevolutions = async (req, res) => {
  try {
    const devolutions = await devolutionService.getAllDevolutions();
    sendResponse(res, devolutions);
  } catch (error) {
    sendError(res, error);
  }
};

const getDevolutionById = async (req, res) => {
  try {
    const devolution = await devolutionService.getDevolutionById(req.params.id);
    sendResponse(res, devolution);
  } catch (error) {
    sendError(res, error);
  }
};

const createDevolution = async (req, res) => {
  try {
    const devolution = await devolutionService.createDevolution(req.body);
    sendResponse(res, devolution);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllDevolutions,
  getDevolutionById,
  createDevolution
};
