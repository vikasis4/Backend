const Otp = require('../models/otp');
const User = require('../models/user.model');

const OTP = async (req, res) => {
    try {
        var otp = await Otp.findOne({ phone: parseInt(req.body.phone) });
        if (otp) {
            if (otp.otp === parseInt(req.body.otp)) {
                await User.findOneAndUpdate({ phone: req.body.phone }, { otp: true }).then(async () => {
                    var user = await User.findOne({ phone: req.body.phone });
                    if (user.tokens.length === 2) {
                        var newArr = user.tokens.shift();
                        await User.findOneAndUpdate({ phone: req.body.phone }, { tokens: newArr })
                    }
                    var token = await user.generateToken();
                    await Otp.findOneAndDelete({ phone: req.body.phone })
                    res.json({ status: 'true', token });
                }).catch((err) => {
                    res.json({ status: 'failed' })
                    console.log(err);
                })
            } else {
                res.json({ status: 'wrong' })
            }
        } else {
            res.json({ status: 'failed' })
        }
    } catch (error) {
        res.json({ status: 'failed' })
        console.log(error);
    }
}

module.exports = OTP