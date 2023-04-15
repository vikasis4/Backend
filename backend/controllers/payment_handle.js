const User = require('../models/user.model');
const PaySlip = require('../models/paySlip');
const assignMentor = require('../middleware/assignMentor');
const Chat = require('../models/chat');

var failed_obj = `<div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column "><h2 style="font-size:4rem; text-align:center; color:red">Payment Failed</h2><h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1><a style="text-decoration:none; display:flex; justify-content:center; padding:1rem 4rem; align-items:center; font-size:4rem; background-color:#5A4FCF; color:white; height:8rem;  border-radius:4px" href="https://rankboost.vercel.app/payment/process">Return to Home</a></div>`
var success_obj = `<div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column "><h2 style="font-size:4rem; text-align:center; color:green">Payment Successfull</h2><h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1><a style="text-decoration:none; display:flex; justify-content:center; padding:1rem 4rem; align-items:center; font-size:4rem; background-color:#5A4FCF; color:white; height:8rem;  border-radius:4px" href="https://rankboost.vercel.app/payment/process">Return to Home</a></div>`

const payment_success = async (req, res) => {

    try {
        if (req.body.status === 'success') {

            var id = req.body.udf1;
            var cartString = req.body.udf2;
            var refrenceId = req.body.bank_ref_num;
            var mhId = req.body.mihpayid;
            var cart = [];
            var chatId = await Chat.create({ userId: id })

            for (let i = 0; i < cartString.length / 4; i++) {
                cart.push({ code: cartString.slice(i * 4, (i + 1) * 4) })
            }
            await PaySlip.create({
                userId: id,
                mhId,
                refrenceId
            })
            await User.findByIdAndUpdate(id, { "$set": { "cart": [], "subarray": cart, "chatId": chatId } })
            if (cart.find(({ code }) => code === 7988)) {
                if (!(await assignMentor(id))) {
                    res.send(failed_obj);
                    return false
                }
            }
            res.send(success_obj);
        } else {
            res.send(failed_obj);
        }
    } catch (error) {
        console.log(error);
    }
}

const payment_failed = async (req, res) => {
    res.send(failed_obj);
}

module.exports = { payment_failed, payment_success }