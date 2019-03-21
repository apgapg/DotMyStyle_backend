const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Inspiration = mongoose.model('inspirations', Schema(),);

module.exports = Inspiration;
