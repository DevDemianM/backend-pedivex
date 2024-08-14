const DevolutionsRepository = require('../repositories/devolutionsRepository');

const { models } = require('../models');

const getAllDevolutions = async () => {
  return await DevolutionsRepository.getAllDevolutions;
};

const getDevolutionsById = async (id) => {
  return await DevolutionsRepository.getDevolutionsById;
};

const createDevolutions = async (data) => {
  return await DevolutionsRepository.createDevolutions;
};

const createDevolucionCambioSabor = async (data) => {
  return await DevolutionsRepository.createDevolucionCambioSabor;
};

const createDevolucionMalEstado = async (data) => {
  return await DevolutionsRepository.createDevolucionMalEstado;
};

const createDevolucionProductoVencido = async (data) => {
  return await DevolutionsRepository.createDevolucionProductoVencido;
};

const createDevolucionEmpaquetadoRoto = async (data) => {
  return await DevolutionsRepository.createDevolucionEmpaquetadoRoto;
};

const updateDevolutions = async (id, data) => {
  return await DevolutionsRepository.updateDevolutions(data, {
    where: { id }
  });
};

const deleteDevolutions = async (id) => {
  return await DevolutionsRepository.deleteDevolutions({
    where: { id }
  });
};

module.exports = {
  getAllDevolutions,
  getDevolutionsById,
  createDevolutions,
  updateDevolutions,
  deleteDevolutions,
  createDevolucionCambioSabor,
  createDevolucionMalEstado,
  createDevolucionProductoVencido,
  createDevolucionEmpaquetadoRoto
};