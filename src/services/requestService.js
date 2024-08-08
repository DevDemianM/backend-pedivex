 
const requestRepository = require('../repositories/requestRepository');

const getAllRequest = async () => {
    return await requestRepository.getAllRequest();
};

const getRequestById = async (id) => {
    return await requestRepository.getRequestById(id);
};

const createRequest = async (data) => {
    return await requestRepository.createRequest(data);
};

const updateRequest = async (id, data) => {
    return await requestRepository.updateRequest(id, data);
};

const deleteRequest = async (id) => {
    return await requestRepository.deleteRequest(id);
};

module.exports = {
    getAllRequest,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};

