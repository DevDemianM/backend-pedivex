// src/middlewares/employeeValidation.js

const { body, validationResult } = require('express-validator');

const employeeValidationRules = () => {
    return [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('department').notEmpty().withMessage('Department is required'),
        body('document').notEmpty().withMessage('Document is required').isString().withMessage('Document must be a string'),
        body('email').isEmail().withMessage('Email is required and must be valid'),
        body('phoneNumber').optional().isString().withMessage('Phone number must be a string'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { employeeValidationRules, validate };
