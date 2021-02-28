const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    userName: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'USER'
    }
});

module.exports = mongoose.model('Users', UserSchema);