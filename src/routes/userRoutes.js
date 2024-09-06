const express = require('express');
const userController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// router.get('/clients', userController.getAllClientUsers);
// router.get('/employees', userController.getAllEmployeeUsers);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;