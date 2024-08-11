const { models } = require('../models');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll();
};

const getDevolutionsById = async (id) => {
  return await models.Devolution.findByPk(id);
};

const createDevolutions = async (data) => {
  return await models.Devolution.create(data);
};

const createDevolucionCambioSabor = async (data) => {
  return await models.Devolution.create(data);
};

const createDevolucionMalEstado = async (data) => {
  return await models.Devolution.create(data);
};

const createDevolucionProductoVencido = async (data) => {
  return await models.Devolution.create(data);
};

const createDevolucionEmpaquetadoRoto = async (data) => {
  return await models.Devolution.create(data);
};


const updateDevolutions = async (id, data) => {
  return await models.Devolution.update(data, {
    where: { id }
  });
};

const deleteDevolutions = async (id) => {
  return await models.Devolution.destroy({
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

