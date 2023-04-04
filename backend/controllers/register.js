const User = require('../models/user.model');
const generateOtp = require('../middleware/otp')
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
    try {
        var users = await User.findOne({ phone: req.body.phone });
        if (users) {
            if (users.otp) {
                res.json({ status: 'true' })
            } else {
                var response = await generateOtp(req.body.phone);
                if (response) {
                    res.json({ status: 'success' })
                } else {
                    res.json({ status: 'error' })
                }
            }
        } else {
            var user = await User.create({
                phone: req.body.phone,
                username: req.body.username,
                room: uuidv4()
            })
            user.save();
            var response = await generateOtp(req.body.phone);
            if (response) {
                res.json({ status: 'success' });
            } else {
                res.json({ status: 'error' })
            }
        }
    }
    catch (error) {
        res.json({ status: 'error' })
        console.log(error);
    }
}

module.exports = register 