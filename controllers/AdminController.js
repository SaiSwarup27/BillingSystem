const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.itemId');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
};

module.exports = {
  getAllOrders
};
