const rolePermissionRepository = require('../repositories/rolePermissionRepositories');

const getAllRolePermissions = async () => {
    return await rolePermissionRepository.getAllRolePermissions();
};

const getRolePermissionById = async (id) => {
    return await rolePermissionRepository.getRolePermissionById(id);
};

const createRolePermission = async (data) => {
    return await rolePermissionRepository.createRolePermission(data);
};

const updateRolePermission = async (id, data) => {
    return await rolePermissionRepository.updateRolePermission(id, data);
};

// Cambiar este método para eliminar por idRole
const deleteRolePermissionsByRoleId = async (idRole) => {
    return await rolePermissionRepository.deleteRolePermissionsByRoleId(idRole);
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermissionsByRoleId, // Cambiado para eliminar por idRole desde req.body
};