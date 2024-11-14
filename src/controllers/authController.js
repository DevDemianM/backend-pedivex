const authService = require('../services/authService');
const { sendResponse, sendError } = require('../utils/response');

const loginUser = async (req, res) => {
  try {
    const userAccess = await authService.loginUser(req.body);
    sendResponse(res, userAccess); 
  } catch (error) {
    sendError(res, error)
  }
}

module.exports = {
  loginUser
};