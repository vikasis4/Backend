const mongoose = require('mongoose');

const UPDATE_mentorId = async () => {
    await mongoose.model("User").updateMany({}, {
        $set: {
            refer_id: ''
        }
    })
}

module.exports = {UPDATE_mentorId}