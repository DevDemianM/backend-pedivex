const dashboard = require('../repositories/dashboard');

const topCinco = async (data) => {
    return await dashboard.topCinco(data.mes)
}

const topAnual = async (data) => {
    return await dashboard.topAnual(data.anio)
}

const ventasPorMes = async (data) => {
    return await dashboard.ventasPorMes(data.anio)
}

module.exports = {
    topCinco,
    topAnual,
    ventasPorMes
}