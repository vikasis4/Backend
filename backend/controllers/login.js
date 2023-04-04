const User = require('../models/user.model');
const genrateOtp = require('../middleware/otp')

const login = async (req, res) => {
    try {
        var user = await User.findOne({ phone: req.body.phone });
        if (user) {
            var result = await genrateOtp(req.body.phone);
            if (result) {
                res.json({ status: 'success' })
            } else {
                res.json({ status: 'error' })
            }
        } else {
            res.json({ status: 'noUser' })
        }
    } catch (error) {
        res.json({ status: 'error' })
        console.log(error);
    }
}

module.exports = login