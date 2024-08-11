const permissionsRepository = require('../repositories/permissionsRepositories');

const getAllPermissions = async () => {
    return await permissionsRepository.getAllPermissions();
};

const getPermissionById = async (id) => {
    return await permissionsRepository.getPermissionById(id);
};

const createPermission = async (data) => {
    return await permissionsRepository.createPermission(data);
};

const updatePermission = async (id, data) => {
    return await permissionsRepository.updatePermission(id, data);
};

const deletePermission = async (id) => {
    return await permissionsRepository.deletePermission(id);
};

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};