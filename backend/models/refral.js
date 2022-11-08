const mongoose = require('mongoose');

const Refral = new mongoose.Schema({
    userid:{type: 'string', required: true},
    accountrefrals : [{
        username: {type: 'string'},
        date:{type: Date, default: new Date()},
    }],
    paymentrefrals : [{
        username: {type: 'string'},
        date:{type: Date, default: new Date()},
        potential: {type: 'string', default: 'yes'},
        cart: [{
            name: { type: 'string'}
        }],
    }],
    upi: {type: 'string', required: true},
    date:{type: Date, default: new Date()},
    paidamount: {type: 'number', default:0},
    pendingamount: {type: 'number', default:0},
    prefs:[{
        username: {type: 'string'},
        date:{type: Date, default: new Date()},
    }],
    status:{type: 'string', default: 'off'},
    paystat:{type: 'string', default: 'no'}
})

module.exports = mongoose.model('Refral', Refral)