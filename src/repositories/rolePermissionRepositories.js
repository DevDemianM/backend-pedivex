const { models } = require('../models');

const getAllRolePermissions = async () => {
    return await models.RolPermission.findAll();
};

const getRolePermissionById = async (id) => {
    return await models.RolPermission.findByPk(id);
};

const createRolePermission = async (data) => {
    return await models.RolPermission.create(data);
};

const updateRolePermission = async (id, data) => {
    return await models.RolPermission.update(data, {
        where: { id }
    });
};

const deleteRolePermission = async (id) => {
    return await models.RolPermission.destroy({
        where: { id }
    });
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};