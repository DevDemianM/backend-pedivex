const boughtsRepository = require('../repositories/boughtsRepositories');

const getAllBoughts = async () => {
    return await boughtsRepository.getAllBoughts();
};

const getBoughtById = async (id) => {
    return await boughtsRepository.getBoughtById(id);
};

const createBought = async (data) => {
    return await boughtsRepository.createBought(data);
};

const updateBought = async (id, data) => {
    return await boughtsRepository.updateBought(id, data);
};

const deleteBought = async (id) => {
    return await boughtsRepository.deleteBought(id);
};

module.exports = {
    getAllBoughts,
    getBoughtById,
    createBought,
    updateBought,
    deleteBought
};