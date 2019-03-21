const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Salon = mongoose.model('salons', Schema(),);

module.exports = Salon;
