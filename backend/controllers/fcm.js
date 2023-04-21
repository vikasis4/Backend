const { send_fcm } = require('../middleware/firebaseMessage')

const fcm = async (req, res) => {
    try {
        var { token, socket_id } = req.body;
        await send_fcm({ res, token, socket_id })
    } catch (error) {
        console.log(error);
    }
}

module.exports = fcm