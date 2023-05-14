const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

const generateToken = async (req, res) => {
    try {

        const appId = 'cf7f421d799545d4b6903f3744c0bfff';
        const appCertificate = '42ab896aff5e4a0aa8d8d89dd2ebafe7';
        var channelName = req.body.room;
        const uid = 0;
        const role = RtcRole.PUBLISHER;
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
        console.log("Token with integer number Uid: " + tokenA);

        res.json({ status: true, tokenA })

    } catch (error) {
        res.json({ status: false })
        console.log(error);
    }
}

module.exports = { generateToken }