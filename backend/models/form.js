const mongoose = require('mongoose');



const Form = new mongoose.Schema({

    id:{type: 'string', required: true},
    q1:{type: 'string', required: true},
    q21:{type: 'string', required: true},
    q22:{type: 'string', required: true},
    q3: {type: 'string', required: true},
    q4: {type: 'string', required: true},
    q5: {type: 'string', required: true},
    q6: {type: 'string', required: true},
    q7: {type: 'string', required: true},
    q8: {type: 'string', required: true},
    q9: {type: 'string', required: true},
    q10: {type: 'string', required: true},
    q11: {type: 'string', required: true},
    q12: {type: 'string', required: true},
    q13: {type: 'string', required: true},
    q14: {type: 'string', required: true},
})

module.exports = mongoose.model('Form', Form)