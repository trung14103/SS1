const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    prerequisites: {
        type: String
    }
},{
        collection: 'courses' 
        
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;