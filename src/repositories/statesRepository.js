const states = require('../models/states')

const findAllStates = async () => {
  return await states.findAll();
}

const findStateById = async (id) => {
  return await states.findByPk(id);
} 

const createState = async (name) => {
  return await states.create(name);
}

const updateState = async (id, name) => {
  return await states.update(id, name);
}

const deleteState = async (id) => {
  return await states.destroy(id);
}

module.exports = {
  findAllStates,
  findStateById,
  createState,
  updateState,
  deleteState
}