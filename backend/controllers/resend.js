const User = require('../models/user.model');
const genrateOtp = require('../middleware/otp')

const resend = async (req, res) => {
    try {
        var result = genrateOtp(req.body.phone);
        if (result) {
            res.json({ status: 'success' })
        } else {
            res.json({ status: 'error' })
        }
    } catch (error) {
        res.json({ status: 'error' })
        console.log(error);
    }
}

module.exports = resend