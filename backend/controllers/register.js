const User = require('../models/user.model');
const generateOtp = require('../middleware/otp')
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {

    try {
        var users = await User.findOne({ phone: req.body.phone });
        if (users) {
            if (user.otp) {
                res.json({ status: 'true' })
            } else {
                //
                res.json({ status: 'false' })
            }
        } else {
            var user = await User.create({
                phone: req.body.phone,
                username: req.body.username,
                room: uuidv4()
            })
            var token = await user.generateToken();
            user.save();
            generateOtp();
            var newUser = await User.findOne({ username: req.body.phone });
            res.json({ status: 'success', token, newUser });
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = register 