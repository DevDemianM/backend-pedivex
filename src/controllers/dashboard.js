const dashboard = require('../services/dashboard');
const { sendResponse, sendError } = require('../utils/response');

const topCinco = async (req, res) => {
    try {
        const { mes } = req.body;
        
        // Validar que el mes esté entre 1 y 12
        if (mes < 1 || mes > 12) {
            return sendError(res, { message: "El mes debe estar entre 1 y 12" }, 400); // Bad Request
        }

        const top = await dashboard.topCinco(req.body);
        sendResponse(res, top, 200); // 200 OK para consultas
    } catch (error) {
        sendError(res, error);
    }
}

const topAnual = async (req, res) => {
    try {
        const { anio } = req.body;
        
        // Validar que el año sea un número positivo
        if (isNaN(anio) || anio <= 0) {
            return sendError(res, { message: "El año debe ser un número positivo" }, 400); // Bad Request
        }

        const top = await dashboard.topAnual(req.body);
        sendResponse(res, top, 200); // 200 OK
    } catch (error) {
        sendError(res, error);
    }
}

const ventasPorMes = async (req, res) => {
    try {
        const { anio } = req.body;

        // Validar que el año sea un número positivo
        if (isNaN(anio) || anio <= 0) {
            return sendError(res, { message: "El año debe ser un número positivo" }, 400); // Bad Request
        }

        const top = await dashboard.ventasPorMes(req.body);
        sendResponse(res, top, 200); // 200 OK
    } catch (error) {
        sendError(res, error);
    }
}

module.exports = {
    topCinco,
    topAnual,
    ventasPorMes
}