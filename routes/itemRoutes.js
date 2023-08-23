const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController.js');

router.get('/',ItemController.getAllitems);

module.exports = router;
