const mongoose = require('mongoose');

const UPDATE_mentorId = async () => {
    await mongoose.model("User").updateMany({}, {
        $set: {
            mentorId: {name:'', id:''}
        }
    })
}

module.exports = {UPDATE_mentorId}