const Otp = require('../models/otp');
var unirest = require("unirest");

const genrateOtp = async (value) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    try {
        var otps = await Otp.findOne({ phone: value })
        if (otps) {
            await Otp.findOneAndUpdate({ phone: value }, { otp: otp })
        } else {
            var sks = await Otp.create({
                phone: value,
                otp: otp
            })
            sks.save()
        }

        var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
        req.query({
            "authorization": "TicJmp9NvkwZsx6qGrh1K5S2dLYO3R4BQ7EoaUjueCnVfgPDIH4na7yOgrWsSNuGpjMhVHLBUTE3fXv9",
            "variables_values": otp,
            "route": "otp",
            "numbers": value
        });
        req.headers({
            "cache-control": "no-cache"
        });
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
        });
        return true

    } catch (e) {
        console.log(e);
        return false
    }
}

module.exports = genrateOtp