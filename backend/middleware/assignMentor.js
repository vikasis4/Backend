const Mentor = require('../models/mentor');
const User = require('../models/user.model');

const assignMentor = async (id) => {
    try {
        var mentor = await Mentor.find({});
        var chatId;
        var roomId;
        var name;
        var mentorId;
        var fcm_token;
        for (let i = 0; i < mentor.length; i++) {
            if (mentor[i].students.length < 60) {
                mentorId = mentor[i]._id;
                break;
            } else {
                continue;
            }
        }
        var value = mentor.find(({ _id }) => _id === mentorId);
        var studentArray = value.students;
        var name = value.name;
        await User.findByIdAndUpdate(id, { mentorId:{name , id: mentorId.toString() }}).then((result) => {
            chatId = result.chatId;
            roomId = result.room;
            name = result.username;
            fcm_token = result.fcm_token
        })
        studentArray.push({ studentId: id, chatId, roomId, name, fcm_token});
        await Mentor.findByIdAndUpdate(mentorId.toString(), { students: studentArray})
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = assignMentor