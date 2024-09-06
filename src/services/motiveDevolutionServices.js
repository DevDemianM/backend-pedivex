const motiveDevolutionRepository = require('../repositories/motiveDevolutionRepositories');

const getAllMotiveDevolutions = async () => {
  return await motiveDevolutionRepository.getAllMotiveDevolutions();
}

module.exports = {
  getAllMotiveDevolutions
}