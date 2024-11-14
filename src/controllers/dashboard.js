const dashboard = require('../services/dashboard');
const { sendResponse, sendError } = require('../utils/response');

const topCinco = async (req, res) => {
    try {
        const { mes } = req.query; // Acceder a los parámetros de la URL (GET)

        // Validación
        if (mes < 1 || mes > 12) {
            return sendError(res, { message: "El mes debe estar entre 1 y 12" }, 400);
        }

        const top = await dashboard.topCinco({ mes }); // Pasamos mes como parte de un objeto
        sendResponse(res, top, 200); // 200 OK
    } catch (error) {
        sendError(res, error);
    }
}

const topAnual = async (req, res) => {
    try {
        const { anio } = req.query; // Acceder a los parámetros de la URL (GET)

        // Validación
        if (isNaN(anio) || anio <= 0) {
            return sendError(res, { message: "El año debe ser un número positivo" }, 400);
        }

        const top = await dashboard.topAnual({ anio });
        sendResponse(res, top, 200);
    } catch (error) {
        sendError(res, error);
    }
}

const ventasPorMes = async (req, res) => {
    try {
        const { anio } = req.query; // Acceder a los parámetros de la URL (GET)

        // Validación
        if (isNaN(anio) || anio <= 0) {
            return sendError(res, { message: "El año debe ser un número positivo" }, 400);
        }

        const top = await dashboard.ventasPorMes({ anio });
        sendResponse(res, top, 200);
    } catch (error) {
        sendError(res, error);
    }
}

module.exports = {
    topCinco,
    topAnual,
    ventasPorMes
}