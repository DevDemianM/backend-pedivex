const jwt = require('jsonwebtoken');
const users = require('../models/users');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ msg: 'Acceso denegado. Token no proporcionado.' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Token no válido.' });

    const user = await users.findByPk(decoded.userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado.' });

    req.user = user;
    next();
  });
};

// Middleware para proteger rutas según rol
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.idRole)) {
    return res.status(403).json({ msg: 'No tienes permisos para acceder a esta ruta.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeRoles };
