const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();
const validateUser = require('../middlewares/validateUser')

router.get('/', userController.getAllClientUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUser, userController.updateUser);

module.exports = router;