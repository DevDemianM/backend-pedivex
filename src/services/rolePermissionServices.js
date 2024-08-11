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

const deleteRolePermission = async (id) => {
    return await rolePermissionRepository.deleteRolePermission(id);
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};