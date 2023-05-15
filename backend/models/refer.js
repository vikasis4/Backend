const mongoose = require('mongoose');

const Refer = new mongoose.Schema({
    user: { type: 'string' },
    refferals: [{
        id: { type: 'string' }
    }],
    paid_refferals: [{
        id: { type: 'string' }
    }],
    withdraw: { type: 'number', default: 0}
})

module.exports = mongoose.model('Refer', Refer)
