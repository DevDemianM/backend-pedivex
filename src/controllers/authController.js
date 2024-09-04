// // controllers/authController.js
// const Users = require('../models/users');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// exports.register = async (req, res) => {
//   const { mail, password, firstName, lastName, document, address, phoneNumber, idRole } = req.body;
  
//   try {
//     const newUser = await Users.create({
//       mail,
//       password, // Será encriptada automáticamente por el hook beforeCreate
//       firstName,
//       lastName,
//       document,
//       address,
//       phoneNumber,
//       idRole,
//     });

//     res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
//   } catch (error) {
//     res.status(400).json({ message: 'Error en el registro', error: error.errors || error.message });
//   }
// };
