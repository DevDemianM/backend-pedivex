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

// Cambiar para eliminar por idRole
const deleteRolePermissionsByRoleId = async (idRole) => {
    return await models.RolPermission.destroy({
        where: { idRole } // Eliminar todas las filas que coincidan con el idRole
    });
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermissionsByRoleId, // Cambiado para eliminar por idRole desde req.body
};