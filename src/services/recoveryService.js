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

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.USER_MAIL,
      to: `${mail}`,
      subject: 'Recuperación de contraseña',
      html: `<p>Tu código de recuperación es: <strong>${token}</strong></p>
      <p>Este código expira en 15 minutos.</p>`,
    });

    console.log('Correo enviado:', info.messageId);
    return { msg: 'Correo enviado correctamente', info, status: 200 };
  } catch (error) {
    console.error('Error enviando correo:', error);
    return { msg: 'No se pudo enviar el correo', error, status: 201 };
  }
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
