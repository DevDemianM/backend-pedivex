const devolutionRepository = require('../repositories/devolutionRespository');

const getAllDevolutions = async () => {
  return await devolutionRepository.getAllDevolutions();
}

const createDevolution = async (data) => {
  return await devolutionRepository.cambioDeSabor(data);
}

module.exports = {
  getAllDevolutions,
  createDevolution
}