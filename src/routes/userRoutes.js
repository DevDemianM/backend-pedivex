const express = require('express');
const userController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

<<<<<<< HEAD

=======
// Nueva ruta para actualizar solo el estado de un usuario
router.patch('/:id', userController.updateUserState);
>>>>>>> 34d7e6070212b63d5811b35bacea605f1fc42d8b

module.exports = router;