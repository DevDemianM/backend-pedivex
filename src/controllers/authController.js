// const { registerUser, loginUser, recoverPassword } = require('../services/authService');

// const register = async (req, res) => {
//   try {
//     const user = await registerUser(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { mail, password } = req.body;
//     const user = await loginUser(mail, password);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const recover = async (req, res) => {
//   try {
//     const { mail, newPassword } = req.body;
//     const response = await recoverPassword(mail, newPassword);
//     res.json(response);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { register, login, recover };
