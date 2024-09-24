const { models } = require('../models');
const generateToken = require('../utils/generateToken');


const loginUser = async (data) => {
  try {

    const currentUser = await models.User.findAll({
      where: {
        mail: data.mail
      }
    });

    const user = currentUser[0].dataValues;

    console.log(data);
    console.log(user);

    if (!currentUser) {
      return {msg: 'usuario_no_encontrado'};
    }

    if (
      user.password == data.password &&
      user.mail == data.mail
    ) {
      const token = await generateToken(currentUser.id);
      return { msg: 'success', token };
      // res.send({ msg: 'success', token });
    } else {
      throw new Error('credenciales');
    }

  } catch (error) {
    throw new Error(error);
  }
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
  return await models.User.update({ state }, {
    where: { id }
  });
};

module.exports = {
  loginUser,
  getAllUsers,
  getUserById,
  getAllClientUsers,
  getAllEmployeeUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserState
};