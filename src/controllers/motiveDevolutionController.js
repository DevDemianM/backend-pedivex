const { sendResponse, sendError } = require('../utils/response');
const motiveDevolutionServices = require('../services/motiveDevolutionServices');

const getAllMotiveDevolutions = async (req, res) => {
  try {
    const motiveDevolutions = await motiveDevolutionServices.getAllMotiveDevolutions();
    sendResponse(res, motiveDevolutions);
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = getAllMotiveDevolutions;