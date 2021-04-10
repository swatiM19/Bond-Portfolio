const mongoose = require('mongoose');

const BondSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        currency: "USD",
        type: Number,
        default: 0,
        get: getPrice,
        set: setPrice
    },
    // AvgReturn: Number,
    // CurrentProfit: Number,
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    }],
    archived: {
        type: Boolean,
        default: false,
    }

})
function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Bonds', BondSchema);