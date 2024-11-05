const sequelize = require('../config/database');
const { models } = require('../models');
const Joi = require('joi');
const { Op } = require('sequelize');

const getAllBoughts = async () => {
    return await models.Bought.findAll({
        include: [
            {
                model: models.BoughtDetail
            },
            {
                model: models.Provider
            }
        ],
    });
};

const getBoughtById = async (id) => {
    return await models.Bought.findByPk(id, {
        include: [
            {
                model: models.BoughtDetail
            },
            {
                model: models.Provider
            }
        ]
    });
};

const createBought = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { nroReceipt, date, total, state, details, providerName } = data;

        const providerValidationErrors = validateProvider(providerName);
        if (providerValidationErrors.length > 0) {
            return { success: false, errors: providerValidationErrors };
        }

        // Verificar si el proveedor ya existe
        let provider = await models.Provider.findOne({
            where: { provider: providerName },
            transaction
        });

        // Crear el proveedor si no existe
        if (!provider) {
            provider = await models.Provider.create({
                provider: providerName
            }, { transaction });
        }

        // Usa el ID del proveedor existente o recién creado
        const idProvider = provider.id;

        // Crea la compra
        const bought = await models.Bought.create({
            nroReceipt,
            date,
            total,
            state,
            idProvider
        }, { transaction });

        const validationErrors = [];
        for (const detail of details) {
            const errors = validateBoughtDetailsSchema(detail);
            if (errors.length > 0) {
                validationErrors.push({
                    detail,
                    errors
                });
            }
        }

        if (validationErrors.length > 0) {
            // Revertir la transacción en caso de error
            await transaction.rollback();

            // Devolver los errores de validación
            return { success: false, errors: validationErrors };
        }

        // Procesa cada detalle de la compra y verifica los insumos
        for (const detail of details) {
            const { supplieName, amount, unit } = detail;

            // Verifica si el insumo ya existe
            let supply = await models.Supply.findOne({
                where: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('name')),
                    Op.eq,
                    supplieName.toLowerCase()
                ),
                transaction
            });

            if (supply) {
                // Si existe, actualiza el stock
                let cantidad = parseInt(amount)
                supply.stock += cantidad;
                await supply.save({ transaction });
            } else {
                // Si no existe, crea un nuevo insumo
                await models.Supply.create({
                    name: supplieName,
                    stock: amount,
                    unit: unit,
                    state: 1 // Puedes cambiar este estado según tus necesidades
                }, { transaction });
            }
        }

        // Crea los detalles de la compra
        const boughtDetails = details.map(detail => ({
            ...detail,
            idBought: bought.id
        }));
        await models.BoughtDetail.bulkCreate(boughtDetails, { transaction });

        // Confirma la transacción
        await transaction.commit();

        return { success: true, bought };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al crear compra y detalles:', error);
        return { success: false, error };
    }
};



const updateBought = async (id, data) => {
    return await models.Bought.update(data, {
        where: { id }
    });
};

const deleteBought = async (id) => {
    return await models.Bought.destroy({
        where: { id }
    });
};

const boughtDetailSchema = Joi.object({
    supplieName: Joi.string().min(1).required().messages({
        'string.empty': 'SupplieName is required',
        'string.base': 'SupplieName must be a string',
    }),
    amount: Joi.number().positive().required().messages({
        'number.base': 'Amount must be a number',
        'number.positive': 'Amount must be greater than 0',
        'any.required': 'Amount is required'
    }),
    unit: Joi.string().valid('gr', 'ml', 'unit').required().messages({
        'string.valid': 'Unit must be one of the following: gr, lb, ml, unit',
        'any.required': 'Unit is required'
    }),
    cost: Joi.number().min(0).required().messages({
        'number.base': 'Subtotal must be a number',
        'number.min': 'Subtotal must be a non-negative number',
        'any.required': 'Subtotal is required'
    }),
    state: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'State must be an integer',
        'number.min': 'State must be between 1 and 5',
        'number.max': 'State must be between 1 and 5',
        'any.required': 'State is required'
    })
});

const validateBoughtDetailsSchema = (detail) => {
    const { error } = boughtDetailSchema.validate(detail, { abortEarly: false });
    if (error) {
        return error.details.map(err => err.message);
    }
    return [];
};

const providerSchema = Joi.object({
    provider: Joi.string().min(1).max(255).required().messages({
        'string.base': 'Provider must be a string',
        'string.empty': 'Provider is required',
        'string.max': 'Provider must be less than 255 characters',
        'string.pattern.base': 'Provider must contain at least one letter'
    }).regex(/[a-zA-Z]/)
});

// Función de validación
const validateProvider = (provider) => {
    const { error } = providerSchema.validate({ provider }, { abortEarly: false });
    if (error) {
        return error.details.map(err => err.message);
    }
    return [];
};

module.exports = {
    getAllBoughts,
    getBoughtById,
    createBought,
    updateBought,
    deleteBought
};