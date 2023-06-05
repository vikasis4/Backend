var jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const dotenv = require('dotenv');
dotenv.config();

const SecKey = process.env.jwt_web_token;


const generateToken = async (id) => {

    try {
        var user = await User.findById(id);
        const token = jwt.sign({ _id: id.toString() }, SecKey);
        if (user.tokens.lenght === 2) {
            user.tokens.shift();
        }
        user.tokens.push({ token })
        user.save()
        return token;
    } catch (error) {
        console.log(error);
        console.log("error in jwt token generation");
    }
}

module.exports = generateToken;