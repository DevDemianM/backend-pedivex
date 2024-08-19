const { body, validationResult } = require('express-validator');

const validateSale = [
    body('deliveryDate')
        .isISO8601().withMessage('Delivery date must be in ISO 8601 format')
        .notEmpty().withMessage('Delivery date is required'),

    body('total')
        .isDecimal({ min: 0 }).withMessage('Total must be a non-negative decimal')
        .notEmpty().withMessage('Total is required'),

    body('state')
        .isInt({ min: 1, max: 5 }).withMessage('State must be an integer between 1 and 5')
        .notEmpty().withMessage('State is required'),

    body('idUser')
        .isInt().withMessage('User ID must be an integer')
        .notEmpty().withMessage('User ID is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateSale;
