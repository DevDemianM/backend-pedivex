
const { body, validationResult } = require('express-validator');

const validateRequestDetail    = [
    body('requestId').isInt().withMessage('Request ID must be an integer'),
    body('productId').isInt().withMessage('Product ID must be an integer'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    body('subtotal').isFloat().withMessage('Subtotal must be a decimal number'),
    body('total').isFloat().withMessage('Total must be a decimal number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRequestDetail;