const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Get all orders (admin access only)
router.get('/orders', AdminController.getAllOrders);

module.exports = router;
