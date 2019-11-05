const validator = require('validator');

module.exports = function validateEnrolment(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.course || (data.course.trim().length <5 && data.course.trim().length > 10) || typeof data.course !== 'number') {
        isFormValid = false;
        errors.course = "Please provide correct course id (Length: 5-10)"
    }

    if(!data.student || (data.student.trim().length < 5 && data.student.trim().length > 10) || typeof data.student !== 'number') {
        isFormValid = false;
        errors.student = "Please provide correct student id (Length: 5-10)"
    }

    if(!data.finalGrade) {
        isFormValid = false;
        errors.finalGrade = "Please provide final grade"
    }

    if(!data.semester) {
        isFormValid = false;
        errors.semester = "Please provide semester"
    }

    return {
        errors,
        isValid: isFormValid
    }

};