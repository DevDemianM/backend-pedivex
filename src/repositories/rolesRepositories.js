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

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};