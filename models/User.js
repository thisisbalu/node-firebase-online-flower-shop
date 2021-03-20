const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
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
        unique: true,
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