const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let enrolmentSchema = new Schema({
    semester: {
        type: Number,
        required: true
    },
    finalGrade: {
        type: String,
    },
    studentRef: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    courseRef: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
},{
        collection: 'enrolments'    
});

const Enrolment = mongoose.model('Enrolment', enrolmentSchema);
module.exports = Enrolment;