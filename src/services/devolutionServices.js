const devolutionRepository = require('../repositories/devolutionRespository');

const getAllDevolutions = async () => {
  return await devolutionRepository.getAllDevolutions();
}

const createDevolution = async (data) => {
  return await devolutionRepository.createDevolution(data);
}

module.exports = {
  getAllDevolutions,
  createDevolution
}