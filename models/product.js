const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feed = mongoose.model('feeds', Schema(),);

module.exports = Feed;
