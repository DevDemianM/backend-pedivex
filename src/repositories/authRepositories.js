const { models } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken').generateToken;

const loginUser = async (data) => {
  const currentUser = await models.User.findOne({
    where: {
      mail: data.mail
    }
  });

  if (!currentUser) {
    return { state: 'false', msg: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(data.password, currentUser.password);
  
  if (isPasswordValid) {
    const token = await generateToken(currentUser.id);

    const currentRole = await models.Role.findOne({
      where: {
        id: currentUser.idRole
      }
    });

    return { state: 'true', token, user: currentUser, role: currentRole };
  } else {
    return { state: 'false', msg: 'Credenciales incorrectas' };
  }
};

module.exports = {
  loginUser
};