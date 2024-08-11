const express = require('express');
const permissionController = require('../controllers/permissionsController');
const validateRole = require('../middlewares/validateRole');

const router = express.Router();

router.get('/', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/',  validateRole,  permissionController.createPermission);
router.put('/:id', validateRole,  permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;