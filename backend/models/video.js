const mongoose = require('mongoose');



const Video = new mongoose.Schema({

    name:{type: 'string'},
    bname:{type: 'string'},
    category:{type: 'string'},
    minutes:{type:'number'},
    seconds:{type:'number'}
})

module.exports = mongoose.model('Video', Video)