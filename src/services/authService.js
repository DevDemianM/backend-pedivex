const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthService {
    async register(data) {
        const user = await User.create(data);
        return user;
    }

    async login({ email, password }) {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.validatePassword(password))) {
            throw new Error('Invalid email or password');
        }

        const token = this.generateToken(user.id);
        return token;
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    async recoverPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        // Generar un token para recuperación de contraseña
        const recoveryToken = this.generateToken(user.id); // Podrías enviar este token al email del usuario
        user.passwordRecovery = recoveryToken; // Aquí se almacenaría en la base de datos
        await user.save();
        // Aquí deberías enviar un email al usuario con el link de recuperación
    }
}

module.exports = new AuthService();
