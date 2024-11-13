const express = require('express');
const userController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const router = express.Router();
const {requestPasswordReset, requestPassword} = require('../services/usersServices');


router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUserState);

router.post('/requestPasswordReset', async (req, res) => {
    try {
        await requestPasswordReset(req.body.mail);
        res.status(200).send('Email sent');
      } catch (error) {
        res.status(400).send(error.message);
      }
});

router.post('/resetPassword', async (req, res) => {
    try {
      await resetPassword(req.body.token, req.body.password);
      res.status(200).send('Contraseña restablecida con exito');
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;