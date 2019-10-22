const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    student_id: {
        type: Number,
        unique: true,
        required: true       
    },
    student_firstName: {
        type: String,
        required: true
    },
    student_lastName: {
        type: String,
        required: true
    },
    student_address: {
        type: String
    },
    student_dob:{
        type: Date
    }
}, {
    collection: 'students'
  });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;