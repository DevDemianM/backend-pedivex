const express = require('express');
const rolePermissionController = require('../controllers/rolePermissionController');
const validatePermission = require('../middlewares/validatePermisssion');

const router = express.Router();

router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/',  validatePermission,  rolePermissionController.createRolePermission);
router.put('/:id', validatePermission,  rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;