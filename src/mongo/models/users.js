const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', User);