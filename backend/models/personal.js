const mongoose = require('mongoose');

const Personal = new mongoose.Schema({
    dialogue: [
        {
            statement: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' },
            mins: { type: 'number' },
            hours: { type: 'number' },
            date: { type: 'number' },
            month: { type: 'number' },
            year: { type: 'number' }
        }
    ],
    date: { type: Date },
    userid: { type: 'string' },
    room: { type: 'string' },
    name: { type: 'string'},
    email: { type: 'string' },
    image: { type: 'string'},
    personal: { type: 'string', default: 'false'}
})

module.exports = mongoose.model('Personal', Personal)