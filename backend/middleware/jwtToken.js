var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SecKey = process.env.jwt_web_token;

const jwtTokenCreate = async (value) => {
    try {
        const token = jwt.sign(value, SecKey);
        return token;
    } catch (error) {
        console.log("error in jwt token generation");
        console.log(error);
        console.log("error in jwt token generation");
    }
}

const jwtTokenVerify = async (token) => {
    try {
        const ans = await jwt.verify(token, SecKey);
        return ans
    } catch (error) {
        console.log('Verification failed');
        return false
    }
}

module.exports = { jwtTokenCreate, jwtTokenVerify }