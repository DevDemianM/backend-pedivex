const { body, validationResult } = require('express-validator');

const validateUser = [
    body('mail')
        .notEmpty().withMessage('Mail is required')
        .isEmail().withMessage('Invalid email format'),
        
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
        .matches(/\d/).withMessage('Password must contain at least one number'),

    body('firstName')
        .notEmpty().withMessage('First name is required')
        .matches(/[a-zA-Z]/).withMessage('First name must contain at least one letter'),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .matches(/[a-zA-Z]/).withMessage('Last name must contain at least one letter'),

    body('document')
        .notEmpty().withMessage('Document is required')
        .isLength({ min: 1 }).withMessage('Document must not be empty'),

    body('address')
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 1 }).withMessage('Address must not be empty'),

    body('phoneNumber')
        .optional() // phoneNumber is not required, but if provided must follow the rules
        .isLength({ min: 7, max: 10 }).withMessage('Phone number must be between 7 and 10 characters'),

    body('idRole')
        .isInt({ min: 1 }).withMessage('IdRole must be a positive integer')
        .notEmpty().withMessage('IdRole is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
