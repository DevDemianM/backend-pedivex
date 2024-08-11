const providerService = require('../services/providersServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllProviders = async (req, res) => {
    try {
        const providers = await providerService.getAllProviders();
        sendResponse(res, providers);
    } catch (error) {
        sendError(res, error);
    }
};

const getProviderById = async (req, res) => {
    try {
        const provider = await providerService.getProviderById(req.params.id);
        if (!provider) {
            return sendError(res, 'provider not found', 404);
        }
        sendResponse(res, provider);
    } catch (error) {
        sendError(res, error);
    }
};

const createProvider = async (req, res) => {
    try {
        const provider = await providerService.createProvider(req.body);
        sendResponse(res, provider, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateProvider = async (req, res) => {
    try {
        const updated = await providerService.updateProvider(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'provider not found', 404);
        }
        sendResponse(res, 'provider updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deleteProvider = async (req, res) => {
    try {
        const deleted = await providerService.deleteProvider(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'provider not found', 404);
        }
        sendResponse(res, 'provider deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};

