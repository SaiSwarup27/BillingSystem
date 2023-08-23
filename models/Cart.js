const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      itemType: String, // 'product' or 'service'
      itemId: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.itemType' },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
