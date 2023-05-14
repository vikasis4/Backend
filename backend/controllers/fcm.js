const User = require('../models/user.model');
const { send_fcm } = require('../middleware/firebaseMessage')

const fcm = async (req, res) => {
    try {
        var { token, socket_id } = req.body;
        await send_fcm({ res, token, socket_id })
    } catch (error) {
        console.log(error);
    }
}

const save_fcm = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, { fcm_token: req.body.fcm_token })
        res.json({ status: true })
    } catch (error) {
        res.json({ status: false })
        console.log(error);
    }
}
module.exports = { fcm, save_fcm }