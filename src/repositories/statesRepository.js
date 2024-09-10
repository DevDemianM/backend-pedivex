const states = require('../models/states')

const findAllStates = async () => {
  return await states.findAll();
}

module.exports = {
  findAllStates
}