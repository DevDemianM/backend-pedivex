const { models } = require('../models');
const bcrypt = require('bcrypt');

const findByMail = async (mail) => {
  return await models.User.findOne({ where: { mail } });
};

const updateRecoveryToken = async (id, token, expires) => {
  return await models.User.update(
    { recoveryToken: token, recoveryTokenExpires: expires },
    { where: { id } }
  );
};

const updatePassword = async (mail, hashedPassword) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(hashedPassword, salt);

  return await models.User.update(
    { password: encryptedPassword },
    { where: { mail } }
  );
};

const clearRecoveryToken = async (mail) => {
  return await models.User.update(
    { recoveryToken: null, recoveryTokenExpires: null },
    { where: { mail } }
  );
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
};

const getAllEmployeeUsers = async () => {
  return await models.User.findAll({
    where: {
      idRole: 3
    }
  });
};

const createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return await models.User.create(data);
};

const updateUser = async (id, data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }
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
  updateUserState,
  findByMail,
  updateRecoveryToken,
  updatePassword,
  clearRecoveryToken
};