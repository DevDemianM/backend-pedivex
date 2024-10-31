const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id }, // Payload
      process.env.JWT_SECRET, // Clave secreta
      {
        algorithm: 'HS256',
        expiresIn: '1h'
      },
      (err, token) => {
        if (err) {
          reject(new Error('Error al generar token'));
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateToken;
