const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            validate({
                validator: 'isEmail'
            })
        ]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isSalesManager: {
        type: Boolean,
        default: false,
    },
    bonds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bonds',
        index: true
    }],

});

module.exports = mongoose.model('Users', UserSchema);