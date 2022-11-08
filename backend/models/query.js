const mongoose =  require("mongoose");

const Query = new mongoose.Schema({
    type: {type: 'string'},
    subject: {type: 'string'},
    dialogue:[
        {
            statement: {type: 'string'},
            type: {type: 'string'},
            content: {type: 'string'},
            mins: { type: 'number'},
            hours: { type: 'number'},
            date: { type: 'number'},
            month: {type: 'number'},
            year: { type: 'number'}        }
    ],
    date: {type: Date},
    userid: {type: 'string'},
    place: {type: 'number'},
    room: {type: 'string'},
    email: {type: 'string'},
    stat: {type: 'string', default: 'new'},
})

module.exports = mongoose.model('Query', Query)