const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = mongoose.model('products', Schema(),);

module.exports = Product;
