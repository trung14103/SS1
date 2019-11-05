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
        required: true
    }
}, {
    collection: 'students'
  });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;