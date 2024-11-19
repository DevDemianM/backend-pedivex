const { models } = require('../models');
const generateToken = require('../utils/generateToken').generateToken;

const loginUser = async (data) => {
  const currentUser = await models.User.findOne({
    where: {
      mail: data.mail
    }
  });

  const currentRole = await models.Role.findOne({
    where: {
      id: currentUser.idRole
    }
  })

  if (!currentUser) {
    return { msg: 'User not found' };
  }
  
  if (currentUser.password == data.password) {
    const token = await generateToken(currentUser.id);
    return { state: 'true', token, user: currentUser, role: currentRole };  
  } else {
    return { state: 'false', msg: 'credenciales incorrectas' };
  }
};

module.exports = {
  loginUser
};