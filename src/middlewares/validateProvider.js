const { body, validationResult } = require('express-validator');

const validateProvider = [
    body('provider')
        .notEmpty().withMessage('Provider is required')
        .isString().withMessage('Provider must be a string')
        .isLength({ max: 255 }).withMessage('Provider must be less than 255 characters')
        .matches(/[a-zA-Z]/).withMessage('Provider must contain at least one letter'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }   
];

module.exports = validateProvider;
