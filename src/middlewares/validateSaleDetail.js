const { body, validationResult } = require('express-validator');

const validateSaleDetails = [
    body('idSale')
        .isInt({ min: 1 }).withMessage('IdSale must be a positive integer')
        .notEmpty().withMessage('IdSale is required'),

    body('idProduct')
        .isInt({ min: 1 }).withMessage('IdProduct must be a positive integer')
        .notEmpty().withMessage('IdProduct is required'),

    body('amount')
        .isInt({ min: 1 }).withMessage('Amount must be an integer greater than or equal to 1')
        .notEmpty().withMessage('Amount is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateSaleDetails;
