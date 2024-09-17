const userRepositories = require('../repositories/usersRepositories');

const loginUser = async (data) => {
  return await userRepositories.loginUser(data);
}

module.exports = {
  loginUser
};