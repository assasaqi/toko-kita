const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getOrders,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController');

// POST Checkout bisa diakses publik (Pembeli membuat pesanan)
router.post('/', createOrder);

// GET Riwayat dan PATCH Status dilindungi verifyToken (Hanya Admin)
router.get('/', verifyToken, getOrders);
router.patch('/:id/status', verifyToken, updateOrderStatus);

module.exports = router;
