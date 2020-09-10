const mongoose = require('mongoose');

//Schema for Users collection
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Users',userSchema)