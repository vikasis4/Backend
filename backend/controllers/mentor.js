const Mentor = require('../models/mentor')
const { jwtTokenVerify, jwtTokenCreate } = require('../middleware/jwtToken')
const bcrypt = require('bcryptjs');


const createAccount = async (req, res) => {
    try {
        var { name, phone, address, password } = req.body;
        var mentorVerify = await Mentor.findOne({ phone })
        if (mentorVerify) {
            res.json({ status: 'duplicate' })
        } else {
            var mentor = await Mentor.create({
                name,
                phone,
                address,
                password,
            })
            var token = await jwtTokenCreate({ id: mentor._id })
            await Mentor.findOneAndUpdate({ phone, token })
            mentor.save();
            res.json({ status: 'true' })
        }
    } catch (error) {
        res.json({ status: 'false' })
        console.log(error);
    }
}

const LoginAccount = async (req, res) => {
    try {
        console.log(req.body);
        var { phone, password } = req.body;
        console.log(password);
        var mentor = await Mentor.findOne({ phone });
        var verify = await bcrypt.compare(password, mentor.password);
        if (verify) {
            var token = await jwtTokenCreate({ id: mentor._id });
            await Mentor.findOneAndUpdate({phone},{ token })
            res.json({ status: 'true', token });
        } else {
            res.json({ status: 'false' });
        }
    } catch (error) {
        res.json({ status: 'failed' });
        console.log(error);
    }
}

const VerifyToken = async (req, res) => {
    try {
        var { token } = req.body;
        var result = await jwtTokenVerify(token);
        if (result) {
            var tkz = await Mentor.findById(result.id);
            if (tkz.token === token) {
                res.json({ status: 'success', value:tkz });
            } else {
                res.json({ status: 'expire' });
            }
        } else {
            res.json({ status: 'false' });
        }
    } catch (error) {
        res.json({ status: 'failed' });
        console.log(error);
    }
}

const FetchData = async (req, res) => {
    try {

    } catch (error) {
        res.json({ status: 'failed' });
        console.log(error);
    }
}

module.exports = { createAccount, LoginAccount, VerifyToken, FetchData }