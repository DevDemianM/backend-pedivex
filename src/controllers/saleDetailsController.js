const saleDetailsRepository = require ('../repositories/saleDetailsRepository');

const getAllsaleDetails = async () => {
    return await saleDetailsRepository.getAllsaleDetails();
};

const getsaleDetailById = async (id) => {
    return await saleDetailsRepository.getsaleDetailById(id);
};

module.exports = {
    getAllsaleDetails,
    getsaleDetailById
};