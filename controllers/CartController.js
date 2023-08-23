const Cart = require('../models/Cart.js');
const User = require('../models/Usermodel.js');
const Product = require('../models/Product.js');
const Service = require('../models/Service.js');
const Order = require('../models/Order.js');

const addToCart = async (req, res) => {
    const { userId, itemType, itemId, quantity } = req.body;
    //console.log(userId, itemType, itemId, quantity);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let item;
        if (itemType === 'product') {
            item = await Product.findById(itemId);
        } 
        else if (itemType === 'service') {
            item = await Service.findById(itemId);
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            const newCart = new Cart({
                userId,
                items: [{ itemType, itemId, quantity }],
        });
        await newCart.save();
        } 
        else {
        // Check if the item already exists in the cart
            const existingItem = cart.items.find(item => item.itemType === itemType && item.itemId.equals(itemId));
        
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ itemType, itemId, quantity });
            }
            await cart.save();
        }

        res.status(200).json({ message: 'Item added to cart' });
    } 
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, itemType, itemId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
    
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
    
        const itemIndex = cart.items.findIndex(item => item.itemType === itemType && item.itemId.equals(itemId));
    
        if (itemIndex !== -1) {
            if (cart.items[itemIndex].quantity > 1) {
                // If the quantity is more than 1, decrement the quantity
                cart.items[itemIndex].quantity -= 1;
            } else {
                // If the quantity is 1, remove the item from the cart
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            res.status(200).json({ message: 'Item removed from cart' });
        } 
        else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};  

const calculateProductTax = (itemPrice) => {
    if(itemPrice > 1000 && itemPrice <= 5000){
        return itemPrice * 0.12;
    }
    else if(itemPrice > 5000){
        return itemPrice * 0.18;
    }
};

const calculateServiceTax = (itemPrice) => {
    if(itemPrice > 1000 && itemPrice <= 8000){
        return itemPrice * 0.1;
    }
    else if(itemPrice > 8000){
        return itemPrice * 0.15;
    }
};

const getTotal = async (req, res) => {
    const { userId } = req.body;
  
    try {
        const cart = await Cart.findOne({ userId }).populate('items.itemId');
    
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        var total = 0;
        var taxAmount = 0;
        for (const item of cart.items) {
            const itemPrice = item.itemId.price * item.quantity;
            if(item.itemType == "product"){
                taxAmount = calculateProductTax(itemPrice); 
                taxAmount += 200;  // PC tax for every item
            }
            else{
                taxAmount = calculateServiceTax(itemPrice); 
                taxAmount += 100;  // SC tax for every item
            }
            total += itemPrice + taxAmount;
        }

        res.status(200).json({ total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const clearCart = async (req, res) => {
    const { userId } = req.body;
  
    try {
        const cart = await Cart.findOne({ userId });
    
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
    
        cart.items = []; // Clearing the items array
        await cart.save();
    
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while clearing the cart' });
    }
};

const confirmOrder = async (req, res) => {
    const { userId } = req.body;
  
    try {
        const cart = await Cart.findOne({ userId }).populate('items.itemId');
    
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        var total = 0;
        var taxAmount = 0;
        if((cart.items).length == 0){
            res.send({"error":"There is no item present in the cart"});
        }
        for (const item of cart.items) {
            const itemPrice = item.itemId.price * item.quantity;
            if(item.itemType == "product"){
                taxAmount = calculateProductTax(itemPrice); 
                taxAmount += 200;  // PC tax for every item
            }
            else{
                taxAmount = calculateServiceTax(itemPrice); 
                taxAmount += 100;  // SC tax for every item
            }
            
            total += itemPrice + taxAmount;
        }
    
        const orderItems = cart.items.map(item => ({
            itemType: item.itemType,
            itemId: item.itemId,
            quantity: item.quantity,
        }));
    
        const newOrder = new Order({
            userId,
            items: orderItems,
            total,
        });
    
        await newOrder.save();
    
        // Clearing the cart after confirming the order
        cart.items = [];
        await cart.save();
    
        res.status(201).json({ message: 'Order confirmed successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while confirming the order' });
        }
  };

module.exports = {
  addToCart,
  removeFromCart,
  getTotal,
  clearCart,
  confirmOrder
};
