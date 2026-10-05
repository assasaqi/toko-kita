const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Daftar Rute API Produk
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);     // Endpoint untuk Edit (Membutuhkan ID)
router.delete('/:id', deleteProduct);  // Endpoint untuk Hapus (Membutuhkan ID)

module.exports = router;

// GET Produk bisa diakses publik (Pembeli)
router.get('/', getProducts);

// CREATE, UPDATE, DELETE dilindungi oleh verifyToken (Hanya Admin)
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
