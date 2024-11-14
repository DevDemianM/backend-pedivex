const { models } = require('../models');
const permissions = require('../models/permissions');

const getAllRoles = async () => {
    return await models.Role.findAll({
        include: {
            model: permissions,
            through: { attributes: [] }
        }
    });
};

const getRoleById = async (id) => {
    return await models.Role.findByPk(id, {
        include: {
            model: permissions,
            through: { attributes: [] }
        }
    });
};

const createRole = async (data) => {
    return await models.Role.create(data);
};

const updateRole = async (id, data) => {
    return await models.Role.update(data, {
        where: { id }
    });
};

const deleteRole = async (id) => {
    return await models.Role.destroy({
        where: { id }
    });
};

const updateRoleState = async (id, state) => {
    // Primero obtenemos el rol actual por su ID
    const role = await models.Role.findByPk(id);

    if (!role) {
        throw new Error('Role not found');
    }

    // Verificamos si el nombre del rol es "administrador", independientemente de mayúsculas o minúsculas
    if (role.role.toLowerCase() === 'administrador') {
        throw new Error('The role "administrador" cannot be edited');
    }

    // Si no es "administrador", se procede a la actualización
    return await models.Role.update({ state }, {
        where: { id }
    });
  };

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    updateRoleState
};