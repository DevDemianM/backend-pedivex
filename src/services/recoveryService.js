const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const usersRepository = require('../repositories/usersRepositories');

const generateToken = () => Math.floor(100000 + Math.random() * 900000).toString();

const requestPasswordRecovery = async (mail) => {
  const user = await usersRepository.findByMail(mail);
  if (!user) throw new Error('Usuario no encontrado');

  const token = generateToken();
  const expiration = new Date(Date.now() + 15 * 60 * 1000); // Expira en 15 minutos

  await usersRepository.updateRecoveryToken(user.id, token, expiration);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL,
    to: mail,
    subject: 'Recuperación de contraseña',
    html: `<p>Tu código de recuperación es: <strong>${token}</strong></p>
    <p>Este código expira en 15 minutos.</p>`,
  });

  return 'Correo enviado con éxito';
};

const validateToken = async (mail, token) => {
  const user = await usersRepository.findByMail(mail);
  if (!user || user.recoveryToken !== token || new Date() > user.recoveryTokenExpires) {
    throw new Error('Token inválido o expirado');
  }

  return 'Token válido';
};

const resetPassword = async (mail, token, newPassword) => {
  await validateToken(mail, token);

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await usersRepository.updatePassword(mail, hashedPassword);
  await usersRepository.clearRecoveryToken(mail);

  return 'Contraseña actualizada con éxito';
};

module.exports = {
  requestPasswordRecovery,
  validateToken,
  resetPassword,
};
