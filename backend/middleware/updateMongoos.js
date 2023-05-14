const mongoose = require('mongoose');

const UPDATE_mentorId = async () => {
    await mongoose.model("User").updateMany({}, {
        $set: {
            fcm_token: ''
        }
    })
}

module.exports = {UPDATE_mentorId}