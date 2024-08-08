
const { body, validationResult } = require('express-validator');

const validateOrderDetail = [
    body('orderId').isInt().withMessage('Order ID must be an integer'),
    body('productId').isInt().withMessage('Product ID must be an integer'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    body('status').isInt().withMessage('Status must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateOrderDetail;
