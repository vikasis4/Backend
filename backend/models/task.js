const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    tasks: [
        {
            name: { type: 'string' }
        }
    ],
    time:{
        from: { type: 'string'},
        to: { type: 'string'}
    }
})

module.exports = mongoose.model('Task', Task)