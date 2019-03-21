const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pricing = new Schema({
    base_price: {
        type: Number,
        required: true
    }, sale_price: {
        type: Number,
        required: true
    }
    , discount: {
        type: Number,
        required: true
    },
});
const Services = new Schema({
    title: {
        type: String,
        required: true
    }, product_brand: {
        type: String,
        required: true
    }, average_time: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pricing: [Pricing]

});
const OfferedServices = new Schema({
    category: {
        type: String,
        required: true
    },
    services: [Services]
});
const StylistSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true
        },
        gender_type: {
            type: String,
            required: true
        },
        tagline: {
            type: String,
            required: true
        },
        profile_picture: {
            type: String,
        },
        offered_services: [OfferedServices]
    }
);

const Stylist = mongoose.model('experts', StylistSchema,);

module.exports = Stylist;
