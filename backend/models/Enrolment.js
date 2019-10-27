const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let enrolmentSchema = new Schema({
    student: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    finalGrade: {
        type: String,
        enum:['P', 'G', 'E', 'F'],
        default: 'F'
    }
},{
        collection: 'enrolments'    
});

const Enrolment = mongoose.model('Enrolment', enrolmentSchema);
module.exports = Enrolment;