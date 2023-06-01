const mongoose = require('mongoose');

const UPDATE_mentorId = async () => {
    await mongoose.model("User").updateMany({}, {
        $set: {
            video: {
                link: 'Null',
                title: 'No Video right now'
            }
        }
    })
}

module.exports = { UPDATE_mentorId }