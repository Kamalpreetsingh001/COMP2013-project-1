// initializing the model schema

const mongoose = require ("mongoose")
const Schema = mongoose.Schema
// create the products model schema 

const productsSchema = new Schema({
  
  productName: {
    type: String,
    required: true,
  },

  brand: {

    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  price: {

    type: String,
    required: true,
  }

});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;