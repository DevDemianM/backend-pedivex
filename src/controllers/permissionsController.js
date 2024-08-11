const permissionService = require('../services/permissionsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        sendResponse(res, permissions);
    } catch (error) {
        sendError(res, error);
    }
};

const getPermissionById = async (req, res) => {
    try {
        const permission = await permissionService.getPermissionById(req.params.id);
        if (!permission) {
            return sendError(res, 'permission not found', 404);
        }
        sendResponse(res, permission);
    } catch (error) {
        sendError(res, error);
    }
};

const createPermission = async (req, res) => {
    try {
        const permission = await permissionService.createPermission(req.body);
        sendResponse(res, permission, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updatePermission = async (req, res) => {
    try {
        const updated = await permissionService.updatePermission(req.params.id, req.body);
        if (updated[0] === 0) {
            return sendError(res, 'permission not found', 404);
        }
        sendResponse(res, 'permission updated successfully');
    } catch (error) {
        sendError(res, error);
    }
};

const deletePermission = async (req, res) => {
    try {
        const deleted = await permissionService.deletePermission(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'permission not found', 404);
        }
        sendResponse(res, 'permission deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};

