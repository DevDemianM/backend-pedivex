const { body, validationResult } = require('express-validator');

const validatePermission = [
    body('permission')
        .notEmpty().withMessage('Permission is required')
        .isLength({ max: 20 }).withMessage('Permission must be less than 20 characters')
        .matches(/[a-zA-Z]/).withMessage('Permission must contain at least one letter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }   
];

module.exports = validatePermission;