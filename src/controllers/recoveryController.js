const recoveryService = require('../services/recoveryService');

const requestPasswordRecovery = async (req, res) => {
  try {
    const { mail } = req.body;
    const message = await recoveryService.requestPasswordRecovery(mail);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const { mail, token } = req.body;
    const message = await recoveryService.validateToken(mail, token);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { mail, token, newPassword } = req.body;
    const message = await recoveryService.resetPassword(mail, token, newPassword);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  requestPasswordRecovery,
  validateToken,
  resetPassword
};
