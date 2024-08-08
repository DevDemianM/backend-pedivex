
const { body, validationResult } = require('express-validator');

const validateRequest    = [
    body('dateTime').isISO8601().withMessage('Date Time must be a valid ISO 8601 date'),
    body('clientId').isInt().withMessage('Client ID must be an integer'),
    body('total').isFloat().withMessage('Total must be a decimal number'),
    body('status').isInt().withMessage('Status must be an integer'),
    body('deliveryDate').optional().isISO8601().withMessage('Delivery Date must be a valid ISO 8601 date'),
    body('statusDate').optional().isISO8601().withMessage('Status Date must be a valid ISO 8601 date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRequest;