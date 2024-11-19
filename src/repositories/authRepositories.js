const { models } = require('../models');
const generateToken = require('../utils/generateToken').generateToken;

const loginUser = async (data) => {
  const currentUser = await models.User.findOne({
    where: {
      mail: data.mail
    }
  });

  if (!currentUser) {
    return { msg: 'User not found' };
  }
  
  if (currentUser.password == data.password) {
    const token = await generateToken(currentUser.id);
    return { state: 'true', token };  
  } else {
    return { state: 'false', msg: 'credenciales incorrectas' };
  }
};

module.exports = {
  loginUser
};