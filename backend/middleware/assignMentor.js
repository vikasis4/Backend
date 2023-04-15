const Mentor = require('../models/mentor');
const User = require('../models/user.model');

const assignMentor = async (id) => {
    try {
        var mentor = await Mentor.find({});
        var chatId;
        var roomId;
        var name;
        var mentorId;
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
        })
        studentArray.push({ studentId: id, chatId, roomId, name});
        await Mentor.findByIdAndUpdate(mentorId.toString(), { students: studentArray})
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = assignMentor