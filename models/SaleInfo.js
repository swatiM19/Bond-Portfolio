const mongoose = require('mongoose');

const SaleInfoSchema = mongoose.Schema({
    customerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    timeStamp: {
        type: Date,
    },
    bondInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bonds'
    },
    salesPersonInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
});

module.exports = mongoose.model('SalesInfo',SaleInfoSchema );