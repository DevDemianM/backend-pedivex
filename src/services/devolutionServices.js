const devolutionRepository = require('../repositories/devolutionRespository');

const getAllDevolutions = async () => {
  return await devolutionRepository.getAllDevolutions();
}

const getDevolutionById = async(id) => {
  return await devolutionRepository.getAllDevolutionById(id);
}

const createDevolution = async (data) => {
  return await devolutionRepository.createDevolution(data);
}

module.exports = {
  getAllDevolutions,
  getDevolutionById,
  createDevolution
}