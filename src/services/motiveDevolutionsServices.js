const motiveDevolutionsRepository = require('../repositories/motiveDevolutionRepositories');

const getAllMotiveDevolutions = async () => {
    return await motiveDevolutionsRepository.getAllMotiveDevolutions();
};

const createMotiveDevolutions = async () => {
    return await motiveDevolutionsRepository.createMotiveDevolutions();
};


module.exports = {
    getAllMotiveDevolutions,
    createMotiveDevolutions
};