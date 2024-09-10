const statesServices = require('../services/statesServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllStates = async (req, res) => {
  try {
    const states = await statesServices.getAllStates();
    sendResponse(res, states);
  } catch (error) {
    sendError(res, error);
  };
}

module.exports = {
  getAllStates
}