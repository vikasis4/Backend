const Mentor = require('../models/mentor')

const UpdateSatus = async (req, res) => {

    try {
        const mentorId = req.body.mentorId;
        const id = req.body.studentId;

        var mentor = await Mentor.findById(mentorId);
        var index = mentor.students.findIndex(({ studentId }) => studentId === id);
        mentor.students[index].status = 'completed';
        mentor.save();

        res.json({ status: true })
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }

}


const handleNotes = async (req, res) => {
    try {
        var { msg, date, month, hrs, mins, Mid, Sid } = req.body
        var mentor = await Mentor.findById(Mid);
        var index = mentor.notes.findIndex(({ studentId }) => studentId === Sid);
        mentor.notes[index].data.push({ txt: msg, date, month, hrs, mins });
        mentor.save()
        res.json({ status: true })

    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
}


const fetchNotes = async (req, res) => {
    try {
        const { Sid, Mid } = req.body;
        var mentor = await Mentor.findById(Mid);
        var index = mentor.notes.findIndex(({ studentId }) => studentId === Sid);
        if (index === -1) {
            res.json({ status: 'no'})
        } else {
            res.json({ status: true, value: mentor.notes[index].data })
        }

    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
}
module.exports = { UpdateSatus, handleNotes, fetchNotes }