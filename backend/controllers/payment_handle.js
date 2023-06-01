const User = require('../models/user.model');
const PaySlip = require('../models/paySlip');
const assignMentor = require('../middleware/assignMentor');
const Chat = require('../models/chat');
const { AddMoney } = require('./referal')
var failed_obj = `<div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column "><h2 style="font-size:4rem; text-align:center; color:red">Payment Failed</h2><h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1></div>`
var success_obj = `<div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column "><h2 style="font-size:4rem; text-align:center; color:green">Payment Successfull</h2><h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1></div>`

////////////////// ChatId should only be created at code 7988 /////////////////// CART is not defined line_nos:33 ////////////////////


const getExpireTime = () => {
    var day = new Date();
    var month = day.getMonth();
    var year = day.getFullYear();
    var date = day.getDate();

    if (month === 1) {
        date = date + 2;
    }
    month = month + 3;
    if (month > 11) {
        month = 11 - month;
        year = year + 1;
    }

    return { date, month, year }
}

const activate = async (id, cartString, refrenceId, res) => {
    try {
        var subs = await User.findById(id);
        var mhId = '';
        var chatId = await Chat.create({ userId: id })

        if (subs.refer_id.length > 1) {
            AddMoney(susb.refer_id)
        }

        var subarr = subs.subarray;

        for (let i = 0; i < cartString.length / 4; i++) {
            if (parseInt(cartString.slice(i * 4, (i + 1) * 4)) === 7988) {
                var { date, month, year } = getExpireTime();
                subarr.push({ code: parseInt(cartString.slice(i * 4, (i + 1) * 4)), expire: { date, month, year } })
            } else {
                subarr.push({ code: parseInt(cartString.slice(i * 4, (i + 1) * 4)), expire: { date: 0, month: 0, year: 0 } })
            }
        }

        await PaySlip.create({
            userId: id,
            mhId,
            refrenceId
        })

        await User.findByIdAndUpdate(id, { "$set": { "cart": [], "subarray": subarr, "chatId": chatId._id } })
        if (subarr.find(({ code }) => code === 7988)) {
            if (!(await assignMentor(id))) {
                return false
            }
            res.send(success_obj);
            return true
        }
    } catch (error) {
        console.log(error);
    }
}


const CCavenue_execute = async (string, res) => {
    var ty = string.split("&");
    var arr = [];
    for (let i = 0; i < ty.length; i++) {
        var values = ty[i].split("=")[0]
        if (values === 'order_id' || values === 'bank_ref_no' || values === 'order_status' || values === 'merchant_param1' || values === 'merchant_param2') {
            arr.push({
                type: ty[i].split("=")[0],
                value: ty[i].split("=")[1],
            })
        }
    }
    const returnValue = (value) => {
        return arr.find(({ type }) => type === value).value
    }
    if (returnValue('order_status') === 'Success') {
        var id = returnValue('merchant_param1');
        var cartString = returnValue('merchant_param2');
        var refrenceId = returnValue('bank_ref_no');
        activate(id, cartString, refrenceId, res)
    } else {
        res.json({ success: false })
    }
}

const paymentHandler = async (req, res) => {
    try {
        var string = req.body.str;
        CCavenue_execute(string, res)
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
}

const Payu_Handler = async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.status === 'success') {
            var id = req.body.udf1;
            var cartString = req.body.udf2;
            var refrenceId = req.body.bank_ref_num;
            activate(id, cartString, refrenceId, res)
        } else {
            res.send(failed_obj)
        }
    } catch (error) {
        res.send(failed_obj)
        console.log(error);
    }
}

module.exports = { paymentHandler, Payu_Handler }