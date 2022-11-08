const mongoose = require('mongoose');



const Otp = new mongoose.Schema({

    id:{type: 'string', required: true},
    otp:{type: 'string', required: true},
})

module.exports = mongoose.model('Otp', Otp)