const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    userId: { type: "string" },
    messages: [
        {
            txt: { type: 'string' },
            hrs: { type: 'number' },
            type: { type: 'string' },
            date: { type: 'number' },
            mins: { type: 'number' },
            month: { type: 'number' },
        }
    ]
})

module.exports = mongoose.model('Chat', Chat)


