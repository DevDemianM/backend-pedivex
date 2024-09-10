const statesrepository = require('../repositories/statesRepository');

const getAllStates = async () => {
  return await statesrepository.findAllStates();
}

module.exports = {
  getAllStates
}