const mongoose = require('mongoose');

const Pyq = new mongoose.Schema({
    name: { type: 'string'},
    bname: { type: 'string' },
    type: { type: 'string' },
})

module.exports = mongoose.model('Pyq', Pyq)