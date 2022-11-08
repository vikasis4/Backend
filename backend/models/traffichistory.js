const mongoose = require('mongoose')

const History = new mongoose.Schema({
    month:{type: 'number'},
    year:{type: 'number'},
    day:{type: 'number'}
})

module.exports = mongoose.model('History', History)