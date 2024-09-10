const sequelize = require('../config/database');
const productionOrderService = require('../services/productionOrderService');
const { sendResponse, sendError } = require('../utils/response');

const ProductionOrder = require('../models/productionOrders'); 
const Supplies = require('../models/supplies'); 


const getAllProductionOrder = async (req, res) => {
    try {
        const productionOrders = await productionOrderService.getAllProductionOrder();
        sendResponse(res, productionOrders);
    } catch (error) {
        sendError(res, error);
    }
};

const getProductionOrderById = async (req, res) => {
    try {
        const productionOrder = await productionOrderService.getProductionOrderById(req.params.id);
        if (!productionOrder) {
            return sendError(res, 'Production Order not found', 404);
        }
        sendResponse(res, productionOrder);
    } catch (error) {
        sendError(res, error);
    }
};

const createProductionOrder = async (req, res) => {
    try {
        const productionOrder = await productionOrderService.createProductionOrder(req.body);
        sendResponse(res, productionOrder, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const updateProductionOrder = async (req, res) => {
    const { id } = req.params;
    const { state, productionOrderDetails } = req.body; // Asume que `productionOrderDetails` es una lista de detalles

    const transaction = await sequelize.transaction();

    try {
        // 1. Buscar la orden de producción
        const productionOrder = await ProductionOrder.findByPk(id, { transaction });
        if (!productionOrder) {
            throw new Error('Production Order not found');
        }

        // 2. Actualizar el estado de la orden de producción
        await productionOrder.update({ state }, { transaction });

        // 3. Si el estado es "en producción", restar los insumos
        if (state === 'produccion') { // Ajusta el estado según tu lógica
            for (const detail of productionOrderDetails) {
                const { idProduct, amount } = detail;

                // 4. Buscar los insumos necesarios para este producto
                const supplies = await Supplies.findOne({ where: { idProduct }, transaction });
                if (!supplies) {
                    throw new Error(`No hay insumo disponible para el producto ${idProduct}`);
                }

                // 5. Verificar si hay suficiente stock de insumos
                if (supplies.stock < amount) {
                    throw new Error(`No hay suficiente stock para el producto ${idProduct}`);
                }

                // 6. Restar el insumo
                await supplies.update({ stock: supplies.stock - amount }, { transaction });
            }
        }

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(200).json({ message: 'Production Order updated and insumos subtracted successfully' });

    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
};


const deleteProductionOrder = async (req, res) => {
    try {
        const deleted = await productionOrderService.deleteProductionOrder(req.params.id);
        if (deleted === 0) {
            return sendError(res, 'Production Order not found', 404);
        }
        sendResponse(res, 'Production Order deleted successfully');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllProductionOrder,
    getProductionOrderById,
    createProductionOrder,
    updateProductionOrder,
    deleteProductionOrder
};
