const massesRepository = require('../repositories/massesRepository');

const getAllMasses = async () => {
    return await massesRepository.getAllMasses();
};

const getMassById = async (id) => {
    return await massesRepository.getMassById(id);
};

const createMass = async (data) => {
    return await massesRepository.createMass(data);
};

const updateMass = async (id, data) => {
    return await massesRepository.updateMass(id, data);
};


module.exports = {
  getAllMasses,
  getMassById,
  createMass,
  updateMass
};