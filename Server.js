const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require("dotenv").config()
const dblink = process.env.dblink;

// Connect to MongoDB
async function connection(){
  try{
      await mongoose.connect(dblink);
      console.log("Database connected sucessfully");
  }
  catch(err){
      console.error(err);
  }
}

connection();

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

// routes
app.use('/user', userRoutes);
app.use('/items', itemRoutes);
app.use('/cart', cartRoutes);
app.use('/admin',adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
