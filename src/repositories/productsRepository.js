const products = require('../models/products');
const datasheets = require('../models/datasheets');
const datasheetDetails = require('../models/datasheetDetails');
const masses = require('../models/masses');
const massDetails = require('../models/massDetails');
const supplies = require('../models/supplies');

const findAllProducts = async () => {
  return await products.findAll({
    include: [
      {
        model: datasheets,
        include: [
          {
            model: datasheetDetails,
            include: [supplies]
          },
          {
            model: masses,
            include: [
              {
                model: massDetails,
                include: [supplies]
              }
            ]
          }
        ]
      }
    ]
  });
}

const findProductById = async (id) => {
  return await products.findByPk(id, {
    include: [
      {
        model: datasheets,
        include: [
          {
            model: datasheetDetails,
            include: [supplies]
          },
          {
            model: masses,
            include: [
              {
                model: massDetails,
                include: [supplies]
              }
            ]
          }
        ]
      }
    ]
  });
}

const createProduct = async (data) => {
  const product = await products.create(data, {
    include: [
      {
        model: datasheets,
        include: [
          {
            model: datasheetDetails
          },
          {
            model: masses,
            include: [
              {
                model: massDetails
              }
            ]
          }
        ]
      }
    ]
  });
  return product;
}

const updateProduct = async (id, data) => {
  const product = await products.findByPk(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // Actualizando el producto
  await product.update(data);

  // Si hay datos relacionados para actualizar, debemos manejarlos
  if (data.datasheets) {
    for (const datasheetData of data.datasheets) {
      const datasheet = await datasheets.findByPk(datasheetData.id);
      if (datasheet) {
        await datasheet.update(datasheetData);

        if (datasheetData.datasheetDetails) {
          for (const detailData of datasheetData.datasheetDetails) {
            const detail = await datasheetDetails.findByPk(detailData.id);
            if (detail) {
              await detail.update(detailData);
            }
          }
        }

        if (datasheetData.masses) {
          const mass = await masses.findByPk(datasheetData.masses.id);
          if (mass) {
            await mass.update(datasheetData.masses);

            if (datasheetData.masses.massDetails) {
              for (const massDetailData of datasheetData.masses.massDetails) {
                const massDetail = await massDetails.findByPk(massDetailData.id);
                if (massDetail) {
                  await massDetail.update(massDetailData);
                }
              }
            }
          }
        }
      }
    }
  }

  return product;
}

const deleteProduct = async (id) => {
  const product = await products.findByPk(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // Eliminar el producto y sus asociaciones
  await product.destroy();
  return product;
}

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
