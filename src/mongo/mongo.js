const mongoose = require('mongoose');

const connect = async () => {
    try {

        await mongoose.connect('mongodb://localhost:27017');

        console.log('MongoDB connected');

    }catch (err) {
        console.log(err);
    }
}

connect();