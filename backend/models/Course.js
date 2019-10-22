const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    course_id: {
        type: Number,
        unique: true,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_prerequisites: {
        type: String
    }
},{
        collection: 'courses' 
        
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;