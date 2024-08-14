const devolutionsService = require('../services/devolutionService');
const { sendResponse, sendError } = require('../utils/response');

const getAllDevolutions = async (req, res) => {
    try {
        const allDevolutions = await devolutionsService.getAllDevolutions();
        sendResponse(res, allDevolutions);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolutions = async (req, res) => {
    try {
        const devolutions = await devolutionsService.createDevolutions(req.body);
        sendResponse(res, devolutions, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolucionCambioSabor = async (req, res) => {
    try {
        const devolutionsCambioSabor = await devolutionsService.createDevolucionCambioSabor(req.body);
        sendResponse(res, devolutionsCambioSabor, 201);
    } catch (error) {
        sendError(res, error);
    }
};



const createDevolucionMalEstado = async (req, res) => {
    try {
        const devolutionsMalEstado = await devolutionsService.createDevolucionMalEstado(req.body);
        sendResponse(res, devolutionsMalEstado, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolucionProductoVencido = async (req, res) => {
    try {
        const devolutionsProductoVencido = await devolutionsService.createDevolucionProductoVencido(req.body);
        sendResponse(res, devolutionsProductoVencido, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolucionEmpaquetadoRoto = async (req, res) => {
    try {
        const devolutionsEmpaquetadoRoto = await devolutionsService.createDevolucionEmpaquetadoRoto(req.body);
        sendResponse(res, devolutionsEmpaquetadoRoto, 201);
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllDevolutions,
    createDevolutions,
    createDevolucionCambioSabor,
    createDevolucionMalEstado,
    createDevolucionProductoVencido,
    createDevolucionEmpaquetadoRoto
};
