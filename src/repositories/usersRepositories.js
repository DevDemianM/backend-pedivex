const { models } = require('../models');

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
  getAllUsers,
  getUserById,
  getAllClientUsers,
  getAllEmployeeUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserState
};