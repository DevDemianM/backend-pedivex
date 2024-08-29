const { registerUser, loginUser, initiatePasswordRecovery, resetPassword } = require('../services/authService');

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await loginUser(req.body.mail, req.body.password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Iniciar recuperación de contraseña
const recoverPassword = async (req, res) => {
  try {
    await initiatePasswordRecovery(req.body.mail);
    res.json({ message: 'Recovery email sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Restablecer contraseña
const confirmResetPassword = async (req, res) => {
  try {
    await resetPassword(req.params.token, req.body.password);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, recoverPassword, confirmResetPassword };