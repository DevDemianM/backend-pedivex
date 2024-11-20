const { models } = require('../models');

const getAllSupplies = async () => {
    return await models.Supply.findAll();
};

const getSuppliesById = async (id) => {
    return await models.Supply.findByPk(id);
};

const createSupplies = async (data) => {
    // Buscar si ya existe un insumo con el mismo nombre
    const existingSupply = await models.Supply.findOne({
        where: { name: data.name }
    });

    if (existingSupply) {
        // Asegúrate de convertir 'stock' a número antes de sumar
        existingSupply.stock = Number(existingSupply.stock) + Number(data.stock);
        return await existingSupply.save();
    } else {
        // Asegúrate de que 'stock' sea un número al crear un nuevo registro
        data.stock = Number(data.stock);
        return await models.Supply.create(data);
    }
};

  

const updateSupplies = async (id, data) => {
    return await models.Supply.update(data, {
        where: { id }
    });
};

const updateSuppliesStock = async (id, stock) => {
    return await models.Supply.update({ stock }, {
        where: { id }
      });
};

const deleteSupplies = async (id) => {
    return await models.Supply.destroy({
        where: { id }
    });
};

module.exports = {
    getAllSupplies,
    getSuppliesById,
    createSupplies,
    updateSupplies,
    deleteSupplies,
    updateSuppliesStock
};

