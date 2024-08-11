const express = require('express');
const rolePermissionController = require('../controllers/rolePermissionController');

const router = express.Router();

router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/',  rolePermissionController.createRolePermission);
router.put('/:id',  rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;