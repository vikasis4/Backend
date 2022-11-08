const mongoose = require('mongoose');



const Payment = new mongoose.Schema({

    razorpay_payment_id:{type: 'string', required: true},
    razorpay_order_id:{type: 'string', required: true},
    user:{type: 'string', required: true},
    date:{type:Date},
    type:{type: 'string', required: true},
    cart: [{
        name: { type: 'string'}
    }],
})

module.exports = mongoose.model('Payment', Payment)