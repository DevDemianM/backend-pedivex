const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función para generar token
const generateToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.JWT_SECRET,
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

// Función para verificar token
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token válido:", decoded);
//     return decoded;
//   } catch (error) {
//     console.error("Token inválido:", error.message);
//     return null;
//   }
// };

// generateToken(123).then(token => {
//   console.log("Token generado:", token);
  
//   // Verifica el token inmediatamente después de generarlo
//   const verificationResult = verifyToken(token);
//   if (verificationResult) {
//     console.log("Verificación exitosa:", verificationResult);
//   } else {
//     console.error("La verificación del token falló.");
//   }
// }).catch(err => {
//   console.error('Error al generar el token:', err.message);
// });

module.exports = {
  generateToken
}