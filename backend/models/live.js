const mongoose = require('mongoose');

const Live = new mongoose.Schema({
    register: {type: 'string'},
    username: {type: 'string'},
    status: {type: 'string', default: 'online'},
    time: {type: 'string'}
})

module.exports = mongoose.model('Live', Live)