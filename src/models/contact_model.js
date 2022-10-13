const mongoose = require('mongoose');

const Contact = mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        firstName: {
            type:String
        },
        lastName: {
            type:String
        }
    },
    contactNo: {
        type:String
    },
    address: {
        city: {
            type:String
        },
        street: {type:String},
        post_code: {type:String},
        country: {type:String}
    },
    createdAt: {type:String}
});

module.exports = mongoose.model('contacts', Contact);