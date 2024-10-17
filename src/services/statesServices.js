const statesrepository = require('../repositories/statesRepository');

const getAllStates = async () => {
  return await statesrepository.findAllStates();
}

const getStateById = async (id) => {
  return await statesrepository.findStateById(id);
}

const createState = async (name) => {
  return await statesrepository.createState(data);
}

const updateState = async (id, name) => {
  return await statesrepository.updateState(id, name);
}

const deleteState = async (id) => {
  return await statesrepository.deleteState(id);
}

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
}