const Sale = require('../models/sale');

class SaleService {
    async createSale(saleData) {
        try {
            const newSale = await Sale.create(saleData);
            return newSale;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getSaleById(id) {
        try {
            const sale = await Sale.findByPk(id);
            if (!sale) {
                throw new Error('Sale not found');
            }
            return sale;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllSales() {
        try {
            const sales = await Sale.findAll();
            return sales;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateSale(id, updateData) {
        try {
            const sale = await this.getSaleById(id);
            return await sale.update(updateData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteSale(id) {
        try {
            const sale = await this.getSaleById(id);
            await sale.destroy();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new SaleService();
