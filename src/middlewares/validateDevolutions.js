// src/validators/validateDevolutions.js
const { body, validationResult } = require('express-validator');

const validateDevolutions = [
    body('voucher').isInt().withMessage('Voucher must be an integer'),
    body('client').notEmpty().withMessage('Client is required').isLength({ max: 30 }).withMessage('Client name must be at most 30 characters long'),
    body('date').isISO8601().withMessage('Date must be a valid date'),
    body('quantityProducts').isInt({ min: 1 }).withMessage('Quantity of products must be at least 1'),
    body('state').isInt().withMessage('State must be an integer'),
    body('id_sale').optional().isInt().withMessage('sale ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDevolutions;
