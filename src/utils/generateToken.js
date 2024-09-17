const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        reject(new Error('Error al generar token'));
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = generateToken;
