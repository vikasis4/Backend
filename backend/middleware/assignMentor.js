const Mentor = require('../models/mentor');

const assignMentor = async () => {
    try {
        var mentor = await Mentor.find({});
        var mentorId;
        for (let i = 0; i < mentor.length; i++) {
            if (mentor[i].students.length < 60) {
                mentorId = mentor[i]._id;
                break;
            } else {
                continue;
            }
        }
        return mentorId.toString()
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = assignMentor