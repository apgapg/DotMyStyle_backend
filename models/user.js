const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
        phone: {
            type: String,
            required: true
        },
    }, {
        timestamps: {}
    }
);

const User = mongoose.model('users', UserSchema,);

module.exports = User;
