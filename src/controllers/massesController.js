const massesServices = require('../services/massesServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllMasses = async (req, res) => {
  try {
    const masses = await massesServices.getAllMasses();
    sendResponse(res, masses);
  } catch (error) {
    sendError(res, error);
  }
};

const getMassById = async (req, res) => {
  try {
    const mass = await massesServices.getMassById(req.params.id);
    sendResponse(res, mass);
  } catch (error) {
    sendError(res, error);
  }
};

const createMass = async (req, res) => {
  try {
    const mass = await massesServices.createMass(req.body);
    sendResponse(res, mass);
  } catch (error) {
    sendError(res, error);
  }
};

const updateMass = async (req, res) => {
  try {
    const mass = await massesServices.updateMass(req.params.id, req.body);
    sendResponse(res, mass);
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = {
  getAllMasses,
  getMassById,
  createMass,
  updateMass
}