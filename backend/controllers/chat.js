const Chat = require('../models/chat')

const get_messages = async (req, res) => {
    try {
        var chat = await Chat.findOne({ userId: req.body.id });
        res.json({ status: true, messages: chat.messages })
    } catch (error) {
        console.log('Error Hogya Beere', error);
        res.json({ status: false })
    }
}

const update_messages = async ( req, res ) => {
    try {
        var data = await Chat.findOne({ userId: req.body.id });
        data.messages.push(req.body.message);
        data.save();
        res.json({ status: true })
    } catch (error) {
        console.log('Error Hogya Beere', error);
        res.json({ status: false })
    }
}

module.exports = { get_messages, update_messages }