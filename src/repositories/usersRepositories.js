const { models } = require('../models');
const generateToken = require('../utils/generateToken');


// const loginUser = async (data) => {
//   try {

//     const currentUser = await models.User.findAll({
//       where: {
//         mail: data.mail
//       }
//     });

//     const user = currentUser[0].dataValues;

//     console.log(data);
//     console.log(user);

//     if (!currentUser) {
//       return {msg: 'usuario_no_encontrado'};
//     }

//     if (
//       user.password == data.password &&
//       user.mail == data.mail
//     ) {
//       const token = await generateToken(currentUser.id);
//       return { state: 'true', token }, res.send({ msg: 'success', token });
//         ;
//     } else {
//       return { state: 'false', msg: 'credenciales incorrectas' };
//     }

//   } catch (error) {
//     return { state: 'false', error };
//   }
// };

const loginUser = async (data) => {
  const currentUser = await models.User.findAll({
    where: {
      mail: data.mail,
    },
  });

  const user = currentUser[0]?.dataValues;

  // Si no se encuentra el usuario, lanzamos un error
  if (!user) {
    throw new Error('usuario_no_encontrado');
  }

  // Validación de las credenciales
  if (user.password === data.password && user.mail === data.mail) {
    // Si las credenciales son correctas, generamos y devolvemos el token
    const token = await generateToken(user.id);
    return { state: 'true', token }; // Devuelve el token en una respuesta positiva
  } else {
    // Si las credenciales son incorrectas
    throw new Error('credenciales_incorrectas');
  }
};


const findUserByEmail = async (email) => {
  return await users.findOne({ where: { mail: email } });
};

const updateUserRecovery = async (user) => {
  return await user.save();
};

const findUserByToken = async (token) => {
  return await users.findOne({ where: { resetToken: token, tokenExpiration: { [Op.gt]: new Date() } } });
};

const getAllUsers = async () => {
  return await models.User.findAll({
    include: [models.Role]
  });
};

const getUserById = async (id) => {
  return await models.User.findByPk(id, {
    include: [models.Role]
  });
};

const getAllClientUsers = async () => {
  return await models.User.findAll({
    where: {
      idRole: 2
    }
  });
}

const getAllEmployeeUsers = async () => {
  return await models.User.findAll({
    where: {
      idRole: 3
    }
  });
}

const createUser = async (data) => {
  return await models.User.create(data);
};

const updateUser = async (id, data) => {
  return await models.User.update(data, {
    where: { id }
  });
};

const deleteUser = async (id) => {
  return await models.User.destroy({
    where: { id }
  });
};

const updateUserState = async (id, state) => {
  const user = await models.User.findByPk(id, {
    include: [models.Role]
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role.role.toLowerCase() === 'administrador') {
    throw new Error('The user with role "administrador" cannot be change state');
  }

  return await models.User.update({ state }, {
    where: { id }
  });
};

module.exports = {
  loginUser,
  getAllUsers,
  getUserById,
  findUserByEmail,
  updateUserRecovery,
  findUserByToken,
  getAllClientUsers,
  getAllEmployeeUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserState
};