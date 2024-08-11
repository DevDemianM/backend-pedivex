const usersRepository = require('../repositories/usersRepositories');

const getAllUsers = async () => {
    return await usersRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await usersRepository.getUserById(id);
};

const createUser = async (data) => {
    return await usersRepository.createUser(data);
};

const updateUser = async (id, data) => {
    return await usersRepository.updateUser(id, data);
};

const deleteUser = async (id) => {
    return await usersRepository.deleteUser(id);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};