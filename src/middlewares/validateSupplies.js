// middleware/validateSupplies.js
const { body, validationResult } = require('express-validator');

const validateSupplies = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 1 }).withMessage('El nombre debe tener como minimo 1 caracteres'),
    body('stock')
        .isFloat({ min: 0 }).withMessage('El stock debe ser un número no negativo'),
    body('unit')
        .notEmpty().withMessage('La unidad es obligatoria')
        .isLength({ max: 5 }).withMessage('La unidad debe tener como máximo 5 caracteres'),
    body('state')
        .isInt({ min: 0 }).withMessage('El estado debe ser un entero no negativo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateSupplies;
