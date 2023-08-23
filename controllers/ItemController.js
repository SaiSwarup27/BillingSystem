const Product = require('../models/Product.js');
const Service = require('../models/Service.js')

const getAllitems = async (req, res) => {
    try {
        const products = await Product.find();
        const services = await Service.find();
        var data = {
          "Product": products,
          "Service": services
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
  getAllitems,
};
