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

const deleteRolePermission = async (req, res) => {
    try {
        const deleted = await rolePermissionService.deleteRolePermission(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'rolePermission not found', 404);
        }
        sendResponse(res, 'rolePermission deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};

