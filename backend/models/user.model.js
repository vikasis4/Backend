var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const User = new mongoose.Schema({

    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    subscription: { type: 'string', default: 'false' },
    guidance_session: {
        plan_time: { type: 'number', default: 0},
        expiry_time: {
            month: {type: 'number', default: 0},
            date: {type: 'number', default: 0},
            year: {type: 'number', default: 0}
        },
    },
    img: { type: 'string', default: 'empty' },
    name: { type: 'string', default: 'User'},
    pkey: { type: 'number', default: 9876 },
    current: {
        bname: { type: 'string', default: ' '},
        name: { type: 'string', default: ' ' },
        category: { type: 'string', default: ' ' },
    },
    quality: { type: 'number', default: 480 },
    refral:{type: 'string', default: 'empty'},
    query: [{
        type: { type: 'string' },
        subject: { type: 'string' },
        dialogue: [
            {
                statement: { type: 'string' },
                type: { type: 'string' },
                content: { type: 'string'},
                mins: { type: 'number'},
                hours: { type: 'number'},
                date: { type: 'number'},
                month: {type: 'number'},
                year: { type: 'number'}
            }
        ],
        place:{type: 'number'},
        date: { type: Date },
        userid: { type: 'string' },
        answered: { type: 'boolean', default: false }
    }],
    subarray: [{
       name: { type: 'string'},
    }],
    otp: { type: 'boolean', default: false },
    date:{type: Date, default: new Date()},
    code: { type: 'number', default: '' },
    cart: [{
        name: { type: 'string'}
    }],
    room: { type: 'string'},
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
