const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.recoverPassword = async (req, res) => {
    try {
        await authService.recoverPassword(req.body.email);
        res.json({ message: 'Recovery email sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Otros métodos según sea necesario...
