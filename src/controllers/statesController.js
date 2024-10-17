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

const getStateById = async (req, res) => {
  try {
    const state = await statesServices.getStateById(req.params.id);
    sendResponse(res, state);
  } catch (error) {
    sendError(res, error);
  }
}

const createState = async (req, res) => {
  try {
    const state = await statesServices.createState(req.body);
    sendResponse(res, state);
  } catch (error) {
    sendError(res, error);
  }
}

const updateState = async (req, res) => {
  try {
    const state = await statesServices.updateState(req.param.id, req.body);
    sendResponse(res, state);
  } catch (error) {
    sendError(res, error);
  }
}

const deleteState = async (req, res) => {
  try {
    const state = await statesServices.deleteState(req.param.id);
    sendResponse(res, state);
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
}