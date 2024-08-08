 
const requestDetailRepository = require('../repositories/requestDetailRepository');

const getAllRequestDetail = async () => {
    return await requestDetailRepository.getAllRequestDetail();
};

const getRequestDetailById = async (id) => {
    return await requestDetailRepository.getRequestDetailById(id);
};

const createRequestDetail = async (data) => {
    return await requestDetailRepository.createRequestDetail(data);
};

const updateRequestDetail = async (id, data) => {
    return await requestDetailRepository.updateRequestDetail(id, data);
};

const deleteRequestDetail = async (id) => {
    return await requestDetailRepository.deleteRequestDetail(id);
};

module.exports = {
    getAllRequestDetail,
    getRequestDetailById,
    createRequestDetail,
    updateRequestDetail,
    deleteRequestDetail
};

