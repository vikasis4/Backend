const User = require('../models/user.model');

const updateCart = async (req, res) => {
    try {
        var {id, cart} = req.body;
        await User.findByIdAndUpdate(id, {cart})
        res.json({status:'yes'})
    } catch (error) {
        res.json({status:'no'})
        console.log(error);
    }
}
 module.exports = updateCart