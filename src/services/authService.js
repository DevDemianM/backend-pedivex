const bcrypt = require('bcrypt'); //Bcrypt es para encriptar las contraseñas.
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const { sendRecoveryEmail } = require('../services/emailService');

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const user = await Users.create(userData);
  return user;
};

const loginUser = async (email, password) => {
  const user = await Users.findOne({ where: { mail: email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Email or password is incorrect');
  }

  const token = jwt.sign({ userId: user.id, role: user.idRole }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Recuperación de contraseña
const initiatePasswordRecovery = async (email) => {
  const user = await Users.findOne({ where: { mail: email } });
  if (!user) {
    throw new Error('No user found with this email');
  }

  // Generar token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  await sendRecoveryEmail(email, token);
  return token;
};

const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Users.findByPk(decoded.userId);
  if (!user) {
    throw new Error('Invalid token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  
  return user;
};

module.exports = { registerUser, loginUser, initiatePasswordRecovery, resetPassword };
