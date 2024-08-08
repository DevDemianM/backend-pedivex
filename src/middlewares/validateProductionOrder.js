
const { body, validationResult } = require('express-validator');

const validateProductionOrder = [
    body('date').isISO8601().withMessage('Date must be a valid ISO 8601 date'),
    body('notes').isLength({ max: 400 }).withMessage('Notes can have up to 400 characters'),
    body('employeeId').isInt().withMessage('Employee ID must be an integer'),
    body('status').isInt().withMessage('Status must be an integer'),
    body('targetDate').optional().isISO8601().withMessage('Target date must be a valid ISO 8601 date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateProductionOrder;

