const productsServices = require('../services/productsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsServices.getAllProducts();
    sendResponse(res, products);
  } catch (err) {
    sendError(res, err);
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await productsServices.getProductById(req.params.id);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}


const createProduct = async (req, res) => {
  try {
    const { file, body } = req;

    if (!file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imagePath = `/uploads/${file.filename}`;

    const data = { ...body, image: imagePath };
    const result = await productsServices.createProduct(data);

    if (result.success) {
      res.status(201).json({ message: 'Product created successfully', product: result.currentProduct });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productsServices.updateProduct(req.params.id, req.body);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await productsServices.deleteProduct(req.params.id);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
