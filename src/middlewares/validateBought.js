const { body, validationResult } = require('express-validator');

const validateBought = [
    body('idProvider')
        .isInt({ min: 1 }).withMessage('IdProvider must be a positive integer')
        .notEmpty().withMessage('IdProvider is required'),

    body('nroReceipt')
        .notEmpty().withMessage('NroReceipt is required')
        .isLength({ max: 255 }).withMessage('NroReceipt must be less than 255 characters'),

    body('date')
        .isISO8601().withMessage('Date must be in ISO 8601 format')
        .notEmpty().withMessage('Date is required'),

    body('total')
        .isDecimal({ min: 0 }).withMessage('Total must be a non-negative decimal')
        .notEmpty().withMessage('Total is required'),

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

module.exports = validateBought;
