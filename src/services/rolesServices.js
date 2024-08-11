const rolesRepository = require('../repositories/rolesRepositories');

const getAllRoles = async () => {
    return await rolesRepository.getAllRoles();
};

const getRoleById = async (id) => {
    return await rolesRepository.getRoleById(id);
};

const createRole = async (data) => {
    return await rolesRepository.createRole(data);
};

const updateRole = async (id, data) => {
    return await rolesRepository.updateRole(id, data);
};

const deleteRole = async (id) => {
    return await rolesRepository.deleteRole(id);
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};