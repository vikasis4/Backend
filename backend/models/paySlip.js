const mongoose = require('mongoose');

const PaySlip = new mongoose.Schema({
   userId:{type: 'string', required: true},
   mhId:{type: 'number', required: true},
   refrenceId:{type: 'number', required: true},
})


module.exports = mongoose.model('PaySlip', PaySlip)