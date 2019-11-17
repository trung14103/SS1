const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true       
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob:{
        type: Date,
        max: '2000/01/01',
        min: '1980/01/01',
        required: true
    },
    enrol:[{
        type:  Schema.Types.ObjectId,
        ref: 'Enrolment'
    }]
}, {
    collection: 'students'
  });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;