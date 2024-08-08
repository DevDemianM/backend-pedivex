const saleService = require('../services/saleService');

exports.createSale = async (req, res) => {
    try {
        const saleData = req.body;
        const newSale = await saleService.createSale(saleData);
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await saleService.getSaleById(req.params.id);
        res.json(sale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getAllSales = async (req, res) => {
    try {
        const sales = await saleService.getAllSales();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const sale = await saleService.updateSale(req.params.id, req.body);
        res.json(sale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        await saleService.deleteSale(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
