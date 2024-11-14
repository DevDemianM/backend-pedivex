const authRepositories = require('../repositories/authRepositories');

const loginUser = async (data) => {
  return await authRepositories.loginUser(data);
}

module.exports = {
  loginUser
};