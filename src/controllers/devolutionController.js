const devolutionsService = require('../services/devolutionService');
const { sendResponse, sendError } = require('../utils/response');

const getAllDevolutions = async (req, res) => {
    try {
        const allDevolutions = await devolutionsService.getAllDevolutions();
        sendResponse(res, allDevolutions);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolutions = async (req, res) => {
    try {
        const devolutions = await devolutionsService.createDevolutions(req.body);
        sendResponse(res, devolutions, 201);
    } catch (error) {
        sendError(res, error);
    }
};

const createDevolucionCambioSabor = async (req, res) => {
    try {
        const devolutionsCambioSabor = await devolutionsService.createDevolucionCambioSabor(req.body);
        sendResponse(res, devolutionsCambioSabor, 201);
    } catch (error) {
        sendError(res, error);
    }
};



const createDevolucionMalEstado = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { idSale, idProducto, cantidad, cliente, fecha, fechaVencimiento } = req.body;

        // Verificar si la fecha de vencimiento es válida
        if (!moment(fechaVencimiento).isValid() || moment(fechaVencimiento).isBefore(moment().startOf('day'))) {
            throw new Error('Fecha de vencimiento no válida o ya ha pasado');
        }

        const saleRecord = await sale.findByPk(idSale);
        if (!saleRecord) {
            throw new Error('idSale no existe en la tabla sale');
        }

        const saleDetailRecord = await saleDetail.findOne({
            where: {
                idSale,
                idProduct: idProducto,
            },
        });
        if (!saleDetailRecord) {
            throw new Error('Producto no encontrado en la venta');
        }

        if (saleDetailRecord.quantity < cantidad) {
            throw new Error('Cantidad insuficiente para devolver');
        }

        const producto = await products.findByPk(idProducto);
        if (!producto) {
            throw new Error('Producto no encontrado en el inventario');
        }

        const nuevaDevolucion = await devolutions.create({
            voucher: `DEV-${Date.now()}`,
            client: cliente,
            date: fecha,
            quantityProducts: cantidad,
            state: 'pendiente',
            idSale: saleRecord.id,
        }, { transaction });

        await devolutionsDetails.create({
            idProduct: idProducto,
            quantity: cantidad,
            motive: 'Producto en mal estado',
            idDevolution: nuevaDevolucion.id,
        }, { transaction });

        producto.stock -= cantidad;
        await producto.save({ transaction });

        saleDetailRecord.quantity -= cantidad;
        await saleDetailRecord.save({ transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Devolución por producto en mal estado registrada exitosamente', devolution: nuevaDevolucion });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

const createDevolucionProductoVencido = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { idSale, idProducto, cantidad, cliente, fecha, comprobanteCompra, fechaVencimiento } = req.body;

        // Verificar si la fecha de vencimiento está vencida por menos de 24 horas
        const fechaVencimientoMoment = moment(fechaVencimiento);
        const fechaActual = moment();
        if (fechaVencimientoMoment.isAfter(fechaActual) || fechaActual.diff(fechaVencimientoMoment, 'hours') > 24) {
            throw new Error('Fecha de vencimiento no está dentro del rango de 24 horas vencido');
        }

        const saleRecord = await sale.findByPk(idSale);
        if (!saleRecord) {
            throw new Error('idSale no existe en la tabla sale');
        }

        const saleDetailRecord = await saleDetail.findOne({
            where: {
                idSale,
                idProduct: idProducto,
            },
        });
        if (!saleDetailRecord) {
            throw new Error('Producto no encontrado en la venta');
        }

        if (saleDetailRecord.quantity < cantidad) {
            throw new Error('Cantidad insuficiente para devolver');
        }

        const producto = await products.findByPk(idProducto);
        if (!producto) {
            throw new Error('Producto no encontrado en el inventario');
        }

        const nuevaDevolucion = await devolutions.create({
            voucher: comprobanteCompra || `DEV-${Date.now()}`, // Usa el comprobante de compra si está disponible
            client: cliente,
            date: fecha,
            quantityProducts: cantidad,
            state: 'pendiente',
            idSale: saleRecord.id,
        }, { transaction });

        await devolutionsDetails.create({
            idProduct: idProducto,
            quantity: cantidad,
            motive: 'Producto vencido',
            idDevolution: nuevaDevolucion.id,
        }, { transaction });

        producto.stock -= cantidad;
        await producto.save({ transaction });

        saleDetailRecord.quantity -= cantidad;
        await saleDetailRecord.save({ transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Devolución por producto vencido registrada exitosamente', devolution: nuevaDevolucion });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

const createDevolucionEmpaquetadoRoto = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { idSale, idProducto, cantidad, cliente, fecha, motivo } = req.body;

        const saleRecord = await sale.findByPk(idSale);
        if (!saleRecord) {
            throw new Error('idSale no existe en la tabla sale');
        }

        const saleDetailRecord = await saleDetail.findOne({
            where: {
                idSale,
                idProduct: idProducto,
            },
        });
        if (!saleDetailRecord) {
            throw new Error('Producto no encontrado en la venta');
        }

        if (saleDetailRecord.quantity < cantidad) {
            throw new Error('Cantidad insuficiente para devolver');
        }

        const producto = await products.findByPk(idProducto);
        if (!producto) {
            throw new Error('Producto no encontrado en el inventario');
        }

        const nuevaDevolucion = await devolutions.create({
            voucher: `DEV-${Date.now()}`,
            client: cliente,
            date: fecha,
            quantityProducts: cantidad,
            state: 'pendiente',
            idSale: saleRecord.id,
        }, { transaction });

        await devolutionsDetails.create({
            idProduct: idProducto,
            quantity: cantidad,
            motive: motivo,
            idDevolution: nuevaDevolucion.id,
        }, { transaction });

        producto.stock -= cantidad;
        await producto.save({ transaction });

        saleDetailRecord.quantity -= cantidad;
        await saleDetailRecord.save({ transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Devolución por empaquetado roto registrada exitosamente', devolution: nuevaDevolucion });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllDevolutions,
    createDevolutions,
    createDevolucionCambioSabor,
    createDevolucionMalEstado,
    createDevolucionProductoVencido,
    createDevolucionEmpaquetadoRoto
};
