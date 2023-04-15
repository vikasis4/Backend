const mongoose = require('mongoose');

const Support = new mongoose.Schema({
    userId: {type: 'string'},
})

module.exports = mongoose.model('Support', Support)