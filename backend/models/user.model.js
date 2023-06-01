var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

var date = new Date();

const User = new mongoose.Schema({

    username: { type: 'string', required: true },

    class: { type: 'number', required: true },

    phone: { type: 'number', required: true },

    last_seen: { type: 'string', default: date },

    creation_date: { type: Date, default: date },

    subarray: [{ code: { type: 'number' }, expire: { date: { type: 'number', }, month: { type: 'number' }, year: { type: 'number' } } }],

    fcm_token: { type: 'string' },

    otp: { type: 'boolean', default: false },

    chatId: { type: 'string', default: '' },

    refer_id: { type: 'string', default: '' },

    supportId: { type: 'string', default: '' },

    video: {
        link: { type: 'string', default:'null' },
        title: { type: 'string', default:'No Video right now' }
    },

    mentorId: {
        name: { type: 'string', default: 'None' }, id: { type: 'string', default: null }
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
