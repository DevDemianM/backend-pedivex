const { Op } = require('sequelize');
const crypto = require ('crypto');
const jwt = require('jsonwebtoken');
const usersRepository = require('../repositories/usersRepositories');
const nodemailer = require ('nodemailer');

const getAllUsers = async () => {
  return await usersRepository.getAllUsers();
};

const getUserById = async (id) => {
  return await usersRepository.getUserById(id);
};


// Función para obtener todos los usuarios clientes
const getAllClientUsers = async () => {
  return await usersRepository.getAllClientUsers();
};

// Función para obtener todos los usuarios empleados
const getAllEmployeeUsers = async () => {
  return await usersRepository.getAllEmployeeUsers();
};

const createUser = async (data) => {
  return await usersRepository.createUser(data);
};

const updateUser = async (id, data) => {
  return await usersRepository.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await usersRepository.deleteUser(id);
};

// Nueva función para actualizar solo el campo `state`
const updateUserState = async (id, state) => {
  return await usersRepository.updateUserState(id, state);
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/resetPassword/${token}`,
  };

  await transporter.sendMail(mailOptions);
};

const requestPasswordReset = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const token = generateResetToken();
  user.resetToken = token;
  user.tokenExpiration = Date.now() + 3600000; // 1 hora
  await userRepository.updateUser(user);
  
  await sendResetEmail(email, token);
};

const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findUserByToken(token);
  if (!user) throw new Error('Token invalid or expired');

  user.password = newPassword; // Asegúrate de encriptar la contraseña
  user.resetToken = null;
  user.tokenExpiration = null;
  await userRepository.updateUser(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  getAllClientUsers,
  getAllEmployeeUsers,
  createUser,
  updateUser,
  deleteUser,
  requestPasswordReset,
  resetPassword,
  updateUserState
};