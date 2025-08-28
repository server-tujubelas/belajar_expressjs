const express = require("express");
const router = express.Router();
const db = require("../db");

const productController = require('../controllers/productController');

router.get('/', productController.getProduct);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;