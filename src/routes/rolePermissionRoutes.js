const express = require('express');
const rolePermissionController = require('../controllers/rolePermissionController');

const router = express.Router();

router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/', rolePermissionController.createRolePermission);
router.put('/:id', rolePermissionController.updateRolePermission);

// No necesitamos cambiar la URL aquí, solo pasaremos el idRole en el cuerpo de la solicitud
router.delete('/', rolePermissionController.deleteRolePermissionsByRoleId);

module.exports = router;