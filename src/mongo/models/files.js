const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const File = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    uploaded_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('File', File);