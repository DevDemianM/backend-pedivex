const { Op } = require('sequelize');
const usersRepository = require('../repositories/usersRepositories');

const getAllUsers = async () => {
    return await usersRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await usersRepository.getUserById(id);
};

// Función para obtener todos los usuarios clientes
const getAllClientUsers = async () => {
    try {
        return await User.findAll({ where: { idRole: { [Op.eq]: 6 } } });
    } catch (error) {
        throw new Error('Error obteniendo usuarios clientes');
    }
};

// Función para obtener todos los usuarios empleados
const getAllEmployeeUsers = async () => {
    try {
        return await User.findAll({ where: { idRole: { [Op.eq]: 7 } } });
    } catch (error) {
        throw new Error('Error obteniendo usuarios empleados');
    }
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
    getAllClientUsers,
    getAllEmployeeUsers,
    createUser,
    updateUser,
    deleteUser
};