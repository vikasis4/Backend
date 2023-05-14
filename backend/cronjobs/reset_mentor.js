var CronJob = require('cron').CronJob;
var Mentor = require('../models/mentor');
console.log('Cron_2 is Active -> Reset_Mentor');

const reset_Mentor = async () => {

    var student_array = await Mentor.find({});

    for (let i = 0; i < student_array.length; i++) {
        var id = student_array[i]._id;
        var mentor = await Mentor.findById(id);
        var array = mentor.students.map((data) => {
            if (data.status === 'completed') {
                return {
                    name: data.name,studentId: data.studentId,
                    chatId: data.chatId,roomId: data.roomId,
                    status: 'pending',_id: data._id,fcm_token: data.fcm_token
                }
            } else {
                return data
            }
        })
        mentor.students = array;
        mentor.save()
    }
}

var job2 = new CronJob(
    '0 1 * * *',
    function () {
        reset_Mentor()
    },
    null,
    true
);

module.exports = job2