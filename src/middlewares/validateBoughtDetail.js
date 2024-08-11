const { body, validationResult } = require('express-validator');

const validateBoughtDetails = [
    body('idBought')
        .isInt({ min: 1 }).withMessage('IdBought must be a positive integer')
        .notEmpty().withMessage('IdBought is required'),

    body('supplieName')
        .notEmpty().withMessage('SupplieName is required')
        .isString().withMessage('SupplieName must be a string')
        .matches(/[a-zA-Z]/).withMessage('SupplieName must contain at least one letter'),

    body('amount')
        .isFloat({ min: 1 }).withMessage('Amount must be a number greater than or equal to 1')
        .notEmpty().withMessage('Amount is required'),

    body('unit')
        .isIn(['gr', 'lb', 'ml', 'unit']).withMessage('Unit must be one of the following: gr, lb, ml, unit')
        .notEmpty().withMessage('Unit is required'),

    body('costUnit')
        .isDecimal({ min: 0 }).withMessage('CostUnit must be a non-negative decimal')
        .notEmpty().withMessage('CostUnit is required'),

    body('subtotal')
        .isDecimal({ min: 0 }).withMessage('Subtotal must be a non-negative decimal')
        .notEmpty().withMessage('Subtotal is required'),

    body('state')
        .isInt({ min: 1, max: 5 }).withMessage('State must be an integer between 1 and 5')
        .notEmpty().withMessage('State is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }   
];

module.exports = validateBoughtDetails;
