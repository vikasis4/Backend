const mongoose = require('mongoose');



const Pdf = new mongoose.Schema({
    name:{type: 'string', required: true},
    bname:{type: 'string', required: true},
    type:{type: 'string', required: true},
})

module.exports = mongoose.model('Pdf', Pdf)