const { body, validationResult } = require('express-validator');

const saleValidationRules = () => {
    return [
        body('deliveryDate').isDate().withMessage('Delivery date must be a valid date')
            .isAfter(new Date().toISOString().split('T')[0]).withMessage('Delivery date must be in the future'),
        body('total').isDecimal({ min: 0 }).withMessage('Total must be a positive decimal'),
        body('status').isInt().withMessage('Status must be an integer'),
        body('idClient').isInt().withMessage('Client ID must be an integer'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { saleValidationRules, validate };
