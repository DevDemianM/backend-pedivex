const rolePermissionService = require('../services/rolePermissionServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllRolePermissions = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.getAllRolePermissions();
        sendResponse(res, rolePermission);
    } catch (error) {
        sendError(res, error);
    }
};

const getRolePermissionById = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.getRolePermissionById(req.params.id);
        if (!rolePermission) {
            return sendError(res, 'rolePermission not found', 404);
        }
        sendResponse(res, rolePermission);
    } catch (error) {
        sendError(res, error);
    }
};

const createRolePermission = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.createRolePermission(req.body);
        sendResponse(res, rolePermission, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateRolePermission = async (req, res) => {
    try {
        const updated = await rolePermissionService.updateRolePermission(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'rolePermission not found', 404);
        }
        sendResponse(res, 'rolePermission updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

// Cambiamos el método para que reciba el idRole por el cuerpo (req.body)
const deleteRolePermissionsByRoleId = async (req, res) => {
    const { idRole } = req.body; // Obtener idRole del cuerpo de la solicitud
    try {
        if (!idRole) {
            return sendError(res, 'idRole is required', 400);
        }
        const deleted = await rolePermissionService.deleteRolePermissionsByRoleId(idRole);
        if (deleted === 0) {
            return sendError(res, 'rolePermissions not found', 404);
        }
        sendResponse(res, 'rolePermissions deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermissionsByRoleId, // Cambiado para eliminar por idRole desde req.body
};