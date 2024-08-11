const { body, validationResult } = require('express-validator');

const validateRole = [
    body('role')
        .notEmpty().withMessage('Role is required')
        .isLength({ max: 20 }).withMessage('Role must be less than 20 characters')
        .matches(/[a-zA-Z]/).withMessage('Role must contain at least one letter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }   
];

module.exports = validateRole;