const Refral = require('./models/refral')
const User = require('./models/user.model')


const reffile = async (type, username, refralcode, cart) => {


    try {
        if (type === 'account') {
            const refral = await Refral.findOne({ userid: refralcode });
            if (refral) {
                var refarray = refral.accountrefrals;
                refarray.push({
                    username,
                })
                await Refral.findOneAndUpdate({ userid: refralcode }, { accountrefrals: refarray });
            }
        }
        else if (type === 'payment') {
            const user = await User.findById(username);
            if (user.refral === 'empty') {
                // totka hai dosto
            }
            else {
                const refcode = await Refral.findOne({ userid: user.refral });
                var refarray = refcode.paymentrefrals;
                refarray.push({
                    username: user.username,
                    cart
                })
                await Refral.findOneAndUpdate({ userid: user.refral }, { paymentrefrals: refarray });
            }

        }
        else if (type === 'withdraw') {
            const refral = await Refral.findOne({ userid: username });
            if (refral) {
                var payarr = refral.paymentrefrals;
                var newarr = []
                var balance = 0
                var onearr = [];
                const forward = async () => {
                    await Refral.findOneAndUpdate({ userid: username }, { paymentrefrals: newarr })
                    await Refral.findOneAndUpdate({ userid: username }, { pendingamount: balance })
                    await Refral.findOneAndUpdate({ userid: username }, { prefs: onearr })
                    await Refral.findOneAndUpdate({ userid: username }, { status: "on" })
                }
                for (let i = 0; i < payarr.length; i++) {
                    if (payarr[i].potential === 'yes') {
                        balance++;
                        newarr.push({
                            username: payarr[i].username,
                            date: payarr[i].date,
                            potential: "no"
                        })
                        onearr.push({
                            username: payarr[i].username,
                            date: payarr[i].date,
                        })
                    } else {
                        newarr.push({
                            username: payarr[i].username,
                            date: payarr[i].date,
                            potential: "no"
                        })
                    }
                    if (i === payarr.length - 1) {
                        balance = balance * 50
                        forward();
                    }
                }
            }
        }
        else if (type === "paid") {
           try {
            const refral = await Refral.findOne({userid: username})
            const pamount = refral.pendingamount
            await Refral.findOneAndUpdate({userid:username},{prefs:[]})
            await Refral.findOneAndUpdate({userid:username},{paystat:"yes"})
            await Refral.findOneAndUpdate({userid:username},{status:"off"})
            await Refral.findOneAndUpdate({userid:username},{pendingamount:0})
            await Refral.findOneAndUpdate({userid:username},{paidamount:pamount})
           } catch (error) {
            console.log(error);
           }
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = reffile