var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

var date = new Date();

const User = new mongoose.Schema({

    username: { type: 'string', required: true },

    phone: { type: 'number', required: true },

    last_seen: { type: 'string', default: date },

    creation_date: { type: Date, default: date },

    subarray: [{ code: { type: 'number' } }],

    otp: { type: 'boolean', default: false },

    chatId: { type: 'string', default: null },

    supportId: { type: 'string', default: null },

    mentorId: {
        name: { type: 'string' }, id: { type: 'string' }
    },

    cart: [{ name: { type: 'string' }, code: { type: 'number' }, price: { type: 'number' } }],

    room: { type: 'string' },

    tokens: [{
        token: {
            type: 'string',
            required: true,
            date: { type: Date, default: new Date() }
        },
    }],
})

const SecKey = process.env.jwt_web_token;

User.methods.generateToken = async function () {

    try {
        const token = jwt.sign({ _id: this._id.toString() }, SecKey);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
        console.log("error in jwt token generation");
    }
}

module.exports = mongoose.model('User', User)
