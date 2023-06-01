const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Mentor = new mongoose.Schema({
    name: { type: 'string', required: true },
    phone: { type: 'number', required: true },
    students: [
        {
            name: { type: 'string' },
            studentId: { type: 'string' },
            chatId: { type: 'string' },
            roomId: { type: 'string' },
            status: { type: 'string', default: 'new' },
            fcm_token: { type: 'string'},
            class: { type: 'number'}
        }
    ],
    notes: [
       {
        data:[
            {
                txt: { type: 'string' },
                hrs: { type: 'number' },
                date: { type: 'number' },
                mins: { type: 'number' },
                month: { type: 'number' },
            }
        ],
        studentId: { type: 'string'}
       }
    ],
    address: { type: 'string', required: true },
    password: { type: 'string', required: true },
    token: { type: 'string' },
})

Mentor.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

module.exports = mongoose.model('Mentor', Mentor)