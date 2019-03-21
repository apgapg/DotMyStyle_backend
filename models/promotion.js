const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promotions = mongoose.model('promotions', Schema(),);

module.exports = Promotions;
