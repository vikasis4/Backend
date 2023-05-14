const FCM = require('fcm-node')
var serverKey = process.env.fcm_server_key
var fcm = new FCM(serverKey);

const send_fcm = async (data) => {
    var { res, token, socket_id } = data;
    var message = {
        to: token,
        collapse_key: 'green',
        priority: 'high',
        data: {
            type: 'call',
            socket_id
        },
    }
    await fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!")
            res.json({ status: false })
        } else {
            res.json({ status: true })
        }
    })
}

module.exports = { send_fcm }