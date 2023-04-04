const mongoose = require('mongoose');

const Otp = new mongoose.Schema({
    phone: { type: 'number', required: true },
    otp: { type: 'number', required: true },
})


module.exports = mongoose.model('Otp', Otp)