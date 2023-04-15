const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Mentor = new mongoose.Schema({
    name: { type: 'string', required: true },
    phone: { type: 'number', required: true },
    students: [
        {
            studentId: { type: 'string' }
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