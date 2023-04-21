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
            console.log("Successfully sent with response: ", response)
            res.json({ status: true })
        }
    })
}

module.exports = { send_fcm }

// cRk6Th18Q6GU3FV4xS-J2e:APA91bEWALbC7YgUi75lsHhQQ5DI-F5qP7Ub2z3wOTzDp0dfiJjPk4oAV1l-6kGJOJmMUD3-tcbwBt9sQru-Z0iZsPvalVU_3j_stXhmIaBQic5vXSahzGAv2E9hV1F3TXmwq6rR_sR5