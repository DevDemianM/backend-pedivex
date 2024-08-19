const nodemailer = require('nodemailer');//Nodemailer es para enviar un correo para cambiar la contraseña

const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambiar esto según el correoElectronico
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendRecoveryEmail = async (to, token) => {
    const url = `${process.env.BASE_URL}/recover-password/${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Recovery',
        text: `Click the following link to recover your password: ${url}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendRecoveryEmail };
