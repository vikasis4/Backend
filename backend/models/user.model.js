var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = new mongoose.Schema({

    username: { type: 'string', required: true },
    phone: { type: 'number', required: true },
    subscription: { type: 'string', default: 'false' },
    last_seen: { type: 'string', default: `${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}` },
    img: { type: 'string', default: 'empty' },
    pkey: { type: 'number', default: 9876 },
    refral: { type: 'string', default: 'empty' },
    query: [{
        type: { type: 'string' },
        subject: { type: 'string' },
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
        place: { type: 'number' },
        date: { type: Date },
        userid: { type: 'string' },
        answered: { type: 'boolean', default: false }
    }],
    subarray: [{
        name: { type: 'string' },
    }],
    otp: { type: 'boolean', default: false },
    date: { type: Date, default: new Date() },
    code: { type: 'number', default: '' },
    cart: [{
        name: { type: 'string' }
    }],
    room: { type: 'string' },
    tokens: [{
        token: {
            type: 'string',
            required: true,
            date: { type: Date, default: new Date() }
        },
    }]
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


User.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

module.exports = mongoose.model('User', User)
