const boughtDetailsRepository = require('../repositories/boughtDetailsRepositories');

const getAllBoughtDetails = async () => {
    return await boughtDetailsRepository.getAllBoughtDetails();
};

const getBoughtDetailById = async (id) => {
    return await boughtDetailsRepository.getBoughtDetailById(id);
};

const createBoughtDetail = async (data) => {
    return await boughtDetailsRepository.createBoughtDetail(data);
};

const updateBoughtDetail = async (id, data) => {
    return await boughtDetailsRepository.updateBoughtDetail(id, data);
};

const deleteBoughtDetail = async (id) => {
    return await boughtDetailsRepository.deleteBoughtDetail(id);
};

module.exports = {
    getAllBoughtDetails,
    getBoughtDetailById,
    createBoughtDetail,
    updateBoughtDetail,
    deleteBoughtDetail
};