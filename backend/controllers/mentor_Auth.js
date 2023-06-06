const Mentor = require('../models/mentor')
const { jwtTokenVerify, jwtTokenCreate } = require('../middleware/jwtToken')
const bcrypt = require('bcryptjs');
const { data } = require('../material_json/mentor')
const User = require('../models/user.model')

const createAccount = async (req, res) => {
    try {
        var { name, phone, address, password } = req.body;
        console.log(req.body);
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
            mentor.token = token;
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
        var { phone, password } = req.body;
        var mentor = await Mentor.findOne({ phone });
        if (mentor) {
            var verify = await bcrypt.compare(password, mentor.password);
            if (verify) {
                var token = await jwtTokenCreate({ id: mentor._id });
                await Mentor.findOneAndUpdate({ phone }, { token })
                res.json({ status: 'true', token });
            } else {
                res.json({ status: 'false' });
            }
        } else {
            res.json({ status: 'nouser' })
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
            if (tkz) {
                if (tkz.token === token) {
                    res.json({ status: 'success', value: tkz.students, id: tkz._id });
                }
            }
            else {
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

const getData = (req, res) => {
    try {
        res.json({ status: true, data })
    } catch (error) {
        res.json({ status: false })
        console.log(error)
    }
}
const setData = async (req, res) => {
    try {
        var { id, name, bname } = req.body;
        var user = await User.findById(id);
        var obj = {
            link: bname,
            title: name
        }
        user.video = obj;
        user.save()
        res.json({ status: true })
    } catch (error) {
        res.json({ status: false })
        console.log(error)
    }
}


module.exports = { createAccount, LoginAccount, VerifyToken, getData, setData }