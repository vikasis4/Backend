const mongoose = require('mongoose');



const Payment = new mongoose.Schema({

    refrence_nos:{type: 'number', required: true},
    transaction_id:{type: 'number', required: true},
    user:{type: 'string', required: true},
    date:{type:Date},
    type:{type: 'string', required: true},
    cart: [{
        name: { type: 'string'}
    }],
})

module.exports = mongoose.model('Payment', Payment)