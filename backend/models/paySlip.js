const mongoose = require('mongoose');

const PaySlip = new mongoose.Schema({
   userId:{type: 'string', required: true},
   mhId:{type: 'number'},
   refrenceId:{type: 'number'},
})


module.exports = mongoose.model('PaySlip', PaySlip)