const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/', userController.getAllEmployeeUsers);
router.get('/:id', userController.getUserById);


module.exports = router;
