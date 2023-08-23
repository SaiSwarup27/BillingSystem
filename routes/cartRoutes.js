const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController.js');

router.post('/add', CartController.addToCart);
router.delete('/remove', CartController.removeFromCart);
router.get('/total', CartController.getTotal);
router.post('/clearCart',CartController.clearCart);
router.post('/confirmOrder',CartController.confirmOrder);

module.exports = router;
