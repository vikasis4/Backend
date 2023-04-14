const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Mentor = new mongoose.Schema({
    name: {type: 'string', required: true},
    phone: {type: 'number', required: true},
    students:[

    ],
    address:{type: 'string', required: true},
    password: {type: 'string', required: true},
    token: {type: 'string', required: true},
})

const SecKey = process.env.jwt_web_token;

Mentor.methods.generateToken = async function () {
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

Mentor.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

module.exports = mongoose.model('Mentor', Mentor)