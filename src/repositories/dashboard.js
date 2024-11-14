const sequelize = require('../config/database');
const { models } = require('../models');
const { Op } = require('sequelize');

// top 5 productos más vendidos del mes actual
const topCinco = async (mes) => {
    try {
        const localDate = new Date();

        // Obtener el primer y último día del mes especificado en el año actual
        const inicioMes = new Date(localDate.getFullYear(), mes - 1, 1);
        inicioMes.setHours(0, 0, 0, 0);
        const finMes = new Date(localDate.getFullYear(), mes, 0);
        finMes.setHours(23, 59, 59, 999);

        // Consulta para obtener la suma de productos vendidos en el mes especificado
        const topProductos = await models.SaleDetail.findAll({
            attributes: [
                'idProduct',
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalCantidadVendida']
            ],
            include: [
                {
                    model: models.Sale,
                    attributes: [],
                    where: {
                        deliveryDate: {
                            [Op.between]: [inicioMes, finMes]
                        }
                    }
                },
                {
                    model: models.Product,
                    attributes: ['name']
                }
            ],
            group: ['idProduct'],
            order: [[sequelize.literal('totalCantidadVendida'), 'DESC']],
            limit: 5
        });

        // Formatear el resultado
        return topProductos.map(saleDetail => ({
            productId: saleDetail.idProduct,
            productName: saleDetail.product.name,
            totalCantidadVendida: saleDetail.getDataValue('totalCantidadVendida')
        }));

    } catch (error) {
        console.error("Error al obtener los productos más vendidos:", error);
        throw error;
    }
};

// Top productos más vendidos de un año específico
const topAnual = async (anio) => {
    try {
        const inicioAnio = new Date(anio, 0, 1);
        const finAnio = new Date(anio, 11, 31);

        // Consulta para obtener la suma de productos vendidos en el año específico
        const topProductosAnuales = await models.SaleDetail.findAll({
            attributes: [
                'idProduct',
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalCantidadVendida']
            ],
            include: [
                {
                    model: models.Sale,
                    attributes: [],
                    where: {
                        deliveryDate: {
                            [Op.between]: [inicioAnio, finAnio]
                        }
                    }
                },
                {
                    model: models.Product,
                    attributes: ['name']
                }
            ],
            group: ['idProduct'],
            order: [[sequelize.literal('totalCantidadVendida'), 'DESC']],
            limit: 5
        });

        // Formatear el resultado
        return topProductosAnuales.map(saleDetail => ({
            productId: saleDetail.idProduct,
            productName: saleDetail.product.name,
            totalCantidadVendida: saleDetail.getDataValue('totalCantidadVendida')
        }));

    } catch (error) {
        console.error("Error al obtener los productos más vendidos anualmente:", error);
        throw error;
    }
};

// Cantidad de ventas por mes en un año específico
const ventasPorMes = async (anio) => {
    try {
        const inicioAnio = new Date(anio, 0, 1);
        const finAnio = new Date(anio, 11, 31);

        // Consulta para obtener la cantidad de ventas agrupadas por mes en el año específico
        const ventasMensuales = await models.Sale.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('deliveryDate')), 'mes'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'cantidadVentas']
            ],
            where: {
                deliveryDate: {
                    [Op.between]: [inicioAnio, finAnio]
                }
            },
            group: ['mes'],
            order: [[sequelize.literal('mes'), 'ASC']]
        });

        // Formatear el resultado
        return ventasMensuales.map(venta => ({
            mes: venta.getDataValue('mes'),
            cantidadVentas: venta.getDataValue('cantidadVentas')
        }));

    } catch (error) {
        console.error("Error al obtener la cantidad de ventas por mes:", error);
        throw error;
    }
};

module.exports = {
    topCinco,
    topAnual,
    ventasPorMes
}