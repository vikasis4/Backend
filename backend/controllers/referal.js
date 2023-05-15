const User = require('../models/user.model');
const Refer = require('../models/refer')

const AddMoney = async (value) => {

    try {

        var refer = Refer.findOne({ user: value })
        refer.paid_refferals.push({ id: value })
        refer.save();

    } catch (error) {
        console.log("Error Hogiya beere Refer AddMoney vich :", error);
    }

}

const withDraw = async (req, res) => {

    try {

        var refer = Refer.findOne({ user: req.id })
        var amount = refer.withdraw;
        amount = req.amount + amount;
        refer.withdraw = amount;
        refer.save();

    } catch (error) {
        console.log("Error Hogiya beere Refer AddMoney vich :", error);
    }

}

const handleReferrals = async (req, res) => {

    try {

        var refree = await Refer.findOne({ user: req.referralId });

        if (!refree) {
            res.json({ status: 'empty' });
            return
        }

        var user = await User.findById(req.userId);
        refree.refferals.push({ id: req.refer_id });

        refree.save()

        user.refer_id = req.referralId;
        user.save();
        res.json({ status: 'true' });

    } catch (error) {
        res.json({ status: 'false' });
        console.log('Error Hogiya Beere Handle refer me :', error);
    }

}

module.exports = { AddMoney, handleReferrals, withDraw }