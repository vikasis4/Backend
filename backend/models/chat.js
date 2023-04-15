const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    userId:{type:"string"}
})

module.exports = mongoose.model('Chat', Chat)