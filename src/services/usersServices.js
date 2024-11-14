const usersRepository = require('../repositories/usersRepositories');

const getAllUsers = async () => {
  return await usersRepository.getAllUsers();
};

const getUserById = async (id) => {
  return await usersRepository.getUserById(id);
};

// Función para obtener todos los usuarios clientes
const getAllClientUsers = async () => {
  return await usersRepository.getAllClientUsers();
};

// Función para obtener todos los usuarios empleados
const getAllEmployeeUsers = async () => {
  return await usersRepository.getAllEmployeeUsers();
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

// Nueva función para actualizar solo el campo `state`
const updateUserState = async (id, state) => {
  return await usersRepository.updateUserState(id, state);
};

module.exports = {
  getAllUsers,
  getUserById,
  getAllClientUsers,
  getAllEmployeeUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserState
};